import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState('');

  // Check auth state on mount
  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await syncUserProfile(session.user);
      }
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser(session.user);
          syncUserProfile(session.user);
        } else {
          setUser(null);
          setCredits(null);
          setIsPremium(false);
        }
      });
    }
    loadUser();
  }, []);

  // Fetch credits and premium status if user is logged in
  useEffect(() => {
    if (user) {
      fetchCredits();
    }
  }, [user]);

  async function syncUserProfile(user) {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      await supabase.from('users').insert([
        {
          id: user.id,
          credits: 3,
          is_premium: false,
        }
      ]);
    }
  }

  async function fetchCredits() {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('credits, is_premium')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Failed to fetch credits:', error.message);
    } else {
      setCredits(data.credits);
      setIsPremium(data.is_premium);
    }
    setLoading(false);
  }

  async function handleLogin(email) {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert('Error sending magic link');
    else alert('Check your email for the login link!');
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setCredits(null);
    setIsPremium(false);
  }

  async function submitPrompt() {
    if (credits <= 0) {
      alert('You have no prompt credits left. Please top up.');
      return;
    }

    // Here you would POST to your n8n webhook
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    // Decrement credits locally (for UI feedback)
    setCredits((prev) => prev - 1);

    const reply = await res.json();
    console.log('Debate Result:', reply);
  }

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h1>ROUND TABLE</h1>
        <p>Enter your email to sign in:</p>
        <input type="email" onBlur={(e) => handleLogin(e.target.value)} />
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to ROUND TABLE</h1>
      <p>Credits left: {loading ? 'Loading...' : credits}</p>
      <p>Premium: {isPremium ? 'Yes' : 'No'}</p>
      <textarea
        rows="3"
        style={{ width: '100%' }}
        placeholder="Type your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <br />
      <button onClick={submitPrompt}>Submit Prompt</button>
      <button onClick={handleLogout} style={{ marginLeft: 10 }}>
        Logout
      </button>
    </div>
  );
}

export default App;