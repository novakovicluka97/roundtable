import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Gamepad2, Trophy, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to Colosseum.io
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          The ultimate platform for competitive gaming. Join tournaments, compete with the best, and win amazing prizes.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button size="lg">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary" />
                <CardTitle>Competitive Tournaments</CardTitle>
                <CardDescription>
                  Join tournaments in your favorite games and compete for prizes.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary" />
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Connect with other gamers, form teams, and make new friends.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Gamepad2 className="h-12 w-12 text-primary" />
                <CardTitle>Multiple Games</CardTitle>
                <CardDescription>
                  Support for a wide range of popular competitive games.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[600px] space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Join?
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Sign up now to start competing in tournaments and winning prizes.
            </p>
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>
                      Enter your details to create your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" placeholder="Enter your password" type="password" />
                    </div>
                    <Button className="w-full">Sign Up</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Enter your credentials to login.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" placeholder="Enter your email" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" placeholder="Enter your password" type="password" />
                    </div>
                    <Button className="w-full">Login</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
} 