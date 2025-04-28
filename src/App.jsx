import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState('');
  const webhook_trump = 'https://marokanac.app.n8n.cloud/webhook-test/trump';
  const webhook_nietzche = 'https://marokanac.app.n8n.cloud/webhook/nietzche';
  const webhook_gandhi = 'https://marokanac.app.n8n.cloud/webhook/gandhi';
  const background_image = 'https://i.imgur.com/BIXbiuT.png';
  const APP_VERSION = '1.0.1'; // Increment this with each change

  // Check auth state on mount
  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted && session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Error loading session:', error);
      }
    }

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      try {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          setCredits(null);
          setIsPremium(false);
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Separate effect for syncing profile when user changes
  useEffect(() => {
    let mounted = true;

    async function syncProfile() {
      if (!user?.id) {
        setCredits(null);
        setIsPremium(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log('Syncing profile for user:', user.id);
        
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (selectError) {
          console.error('Error checking user profile:', selectError.message);
          return;
        }

        if (!existingUser) {
          console.log('Creating new user profile for:', user.id);
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .upsert({
              id: user.id,
              credits: 30,
              is_premium: false,
            })
            .select()
            .single();

          if (insertError) {
            console.error('Insert failed:', insertError.message);
            return;
          }

          if (newUser) {
            console.log('User profile created successfully:', newUser);
            if (mounted) {
              setCredits(newUser.credits);
              setIsPremium(newUser.is_premium);
              setLoading(false);
            }
          }
        } else {
          console.log('Existing user profile found:', existingUser);
          if (mounted) {
            setCredits(existingUser.credits);
            setIsPremium(existingUser.is_premium);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Unexpected error in profile sync:', err);
        if (mounted) {
          setLoading(false);
        }
      }
    }

    syncProfile();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setCredits(null);
      setIsPremium(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async function fetchCredits() {
    if (!user?.id) {
      console.error('No user ID available for fetchCredits');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting to fetch credits from Supabase...');
      const { data, error } = await supabase
        .from('users')
        .select('credits, is_premium')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Failed to fetch credits:', error.message);
        return;
      }

      if (!data) {
        console.error('No user data found for ID:', user.id);
        return;
      }

      console.log('Successfully fetched user data:', data);
      setCredits(data.credits);
      setIsPremium(data.is_premium);
    } catch (err) {
      console.error('Unexpected error fetching credits:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(email) {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert('Error sending magic link');
    else alert('Check your email for the login link!');
  }

  async function submitPrompt() {
    if (loading) {
      console.log('Still loading, please wait...');
      return;
    }

    console.log('Current credits before submission:', credits);
    if (credits === null || credits <= 0) {
      alert('You have no prompt credits left. Please top up.');
      return;
    }

    try {
      setLoading(true);
      
      // First webhook request
      const res1 = await fetch(webhook_trump, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!res1.ok) {
        throw new Error('First webhook response was not ok');
      }

      const response1 = await res1.json();
      console.log('First webhook response:', response1);

      // Second webhook request with first response
      const res2 = await fetch(webhook_nietzche, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: response1.text,
          name: response1.name 
        })
      });

      if (!res2.ok) {
        throw new Error('Second webhook response was not ok');
      }

      const response2 = await res2.json();
      console.log('Second webhook response:', response2);

      // Third webhook request with second response
      const res3 = await fetch(webhook_gandhi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: response2.text,
          name: response2.name 
        })
      });

      if (!res3.ok) {
        throw new Error('Third webhook response was not ok');
      }

      const response3 = await res3.json();
      console.log('Final response:', response3);

      // Update credits in Supabase
      const { error: updateError } = await supabase
        .from('users')
        .update({ credits: credits - 1 })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Update local state
      setCredits(credits - 1);
      
      // Start the loop again with the final response
      const loopRes = await fetch(webhook_trump, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: response3.text,
          name: response3.name 
        })
      });

      if (!loopRes.ok) {
        throw new Error('Loop webhook response was not ok');
      }

      const loopResponse = await loopRes.json();
      console.log('Loop response:', loopResponse);

    } catch (error) {
      console.error('Error in webhook chain:', error);
      alert('Failed to process prompt. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${background_image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
  };

  const contentStyle = {
    position: 'relative',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: '0 auto',
    color: 'white',
    boxShadow: '0 0 20px rgba(255, 165, 0, 0.5)',
  };

  if (!user) {
    return (
      <div>
        <div style={backgroundStyle}></div>
        <div style={contentStyle}>
          <h1>ROUND TABLE</h1>
          <p>Enter your email to sign in:</p>
          <input 
            type="email" 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin(e.target.value);
              }
            }}
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
          />
          <button 
            onClick={() => {
              const emailInput = document.querySelector('input[type="email"]');
              if (emailInput) handleLogin(emailInput.value);
            }}
            style={{
              backgroundColor: '#FF9900',
              color: 'black',
              fontWeight: 'bold',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Send Login Link
          </button>
          <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '10px' }}>
            Join Elon and Socrates at the Round Table
          </p>
          <p style={{ fontSize: '10px', opacity: 0.6, marginTop: '20px' }}>
            Version {APP_VERSION}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={backgroundStyle}></div>
      <div style={contentStyle}>
        <h1>Welcome to ROUND TABLE</h1>
        <p>Credits left: {loading ? 'Loading...' : (credits === null ? '0' : credits)}</p>
        <p>Premium: {isPremium ? 'Yes' : 'No'}</p>
        <textarea
          rows="3"
          style={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '10px' }}
          placeholder="Type your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <br />
        <button 
          onClick={submitPrompt} 
          style={{ 
            backgroundColor: '#FF9900', 
            color: 'black', 
            fontWeight: 'bold',
            opacity: loading ? 0.5 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading || credits === null || credits <= 0}
        >
          {loading ? 'Loading...' : 'Submit Prompt'}
        </button>
        <button 
          onClick={handleLogout} 
          style={{ marginLeft: 10, backgroundColor: '#333', color: 'white' }}
        >
          Logout
        </button>
        <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '20px' }}>
          Watch as Elon and Socrates debate your prompt at the Round Table
        </p>
        <p style={{ fontSize: '10px', opacity: 0.6, marginTop: '20px' }}>
          Version {APP_VERSION}
        </p>
      </div>
    </div>
  );
}

export default App;