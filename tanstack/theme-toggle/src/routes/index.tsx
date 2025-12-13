import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { ThemeToggle } from "~/features/theme/theme-toggle";
import { useTheme } from "~/features/theme/theme-provider";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation Header */}
      <nav className="container mx-auto flex justify-between items-center px-4 py-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌙</span>
          <span className="text-xl font-bold">Theme Tutorial</span>
        </div>
        <ThemeToggle />
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            🌙 Complete Guide Available
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Master Light & Dark Mode
            <span className="block text-primary">in React</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Learn how to implement beautiful, accessible theme switching with modern React patterns.
            From basic toggles to advanced system preferences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Tutorial
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Know</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive coverage of theme implementation, from beginner concepts to advanced
            techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <CardTitle className="text-xl">Theme Switching</CardTitle>
              <CardDescription>
                Learn to implement smooth transitions between light and dark themes with CSS
                variables and React state.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 2 */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <CardTitle className="text-xl">System Preferences</CardTitle>
              <CardDescription>
                Respect user's system preferences and provide automatic theme detection with
                prefers-color-scheme.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 3 */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💾</span>
              </div>
              <CardTitle className="text-xl">Persistence</CardTitle>
              <CardDescription>
                Save user preferences to localStorage and maintain theme state across browser
                sessions.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 4 */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <CardTitle className="text-xl">Accessibility</CardTitle>
              <CardDescription>
                Ensure your theme switching is accessible with proper ARIA labels and keyboard
                navigation.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 5 */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <CardTitle className="text-xl">Modern Tools</CardTitle>
              <CardDescription>
                Use the latest React patterns including Context API, custom hooks, and TypeScript
                for type safety.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 6 */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <CardTitle className="text-xl">Responsive Design</CardTitle>
              <CardDescription>
                Create themes that work beautifully across all devices and screen sizes with
                Tailwind CSS.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple 3-Step Process</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow our structured approach to implement professional theme switching in your React
            applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold mb-3">Setup CSS Variables</h3>
            <p className="text-muted-foreground">
              Configure your design system with CSS custom properties for seamless theme switching.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold mb-3">Create Theme Context</h3>
            <p className="text-muted-foreground">
              Build a React Context provider to manage theme state throughout your application.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold mb-3">Add Toggle Component</h3>
            <p className="text-muted-foreground">
              Implement an elegant toggle component with smooth animations and user feedback.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have mastered theme switching with our comprehensive
            tutorial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Begin Tutorial
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Browse Examples
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Theme Tutorial. Built with React, TanStack Router, and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
