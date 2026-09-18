import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

function SignInPage() {
  return (
    <main className="app-shell-bg min-h-svh flex items-center justify-center px-6 py-10">
      <Card className="w-full max-w-md border-border/70 shadow-none bg-card/90 ring-1 ring-border/50">
        <CardHeader className="text-center items-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="size-5"></Sparkles>
          </div>
          <CardTitle className="font-semibold tracking-tight font-heading text-3xl">
            Meeting Assistant
          </CardTitle>
          <CardDescription className="leading-relaxed text-base">
            Sign in to your account
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  )
}

export default SignInPage