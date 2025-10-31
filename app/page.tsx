import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles, MapPin, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">PetLink</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <Link href="/upload">
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 min-h-[calc(100vh-73px)] flex items-center py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Pet Matching</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
              Find the Perfect Match for Your Pet
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              Connect with local pet owners for responsible breeding. Our AI identifies breed, coat type, and suggests
              compatible matches in your area.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/upload">
                <Button size="lg" className="w-full sm:w-auto">
                  Upload Your Pet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full w-full">
              <Image
                src="/happy-golden-retriever-and-fluffy-cat-sitting-toge.jpg"
                alt="Happy pets together"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PetLink?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Advanced technology meets responsible pet breeding
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="relative h-48 w-full">
                <Image
                  src="/ai-technology-analyzing-dog-breed-with-digital-int.jpg"
                  alt="AI Breed Detection"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Breed Detection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced AI technology automatically identifies your pet's breed and coat characteristics with high
                  accuracy.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="relative h-48 w-full">
                <Image
                  src="/map-with-location-pins-showing-nearby-pets.jpg"
                  alt="Location-Based Matching"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Location-Based Matching</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find compatible pets in your local area, making it convenient to connect with nearby pet owners.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="relative h-48 w-full">
                <Image
                  src="/two-compatible-dogs-meeting-and-playing-together.jpg"
                  alt="Smart Compatibility"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Compatibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our algorithm suggests the most compatible matches based on breed, health, and owner preferences.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Three simple steps to find the perfect match for your pet
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl -z-10 group-hover:bg-primary/30 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Photo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simply upload a clear photo of your pet to our platform
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center text-3xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl -z-10 group-hover:bg-accent/30 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our AI identifies breed, coat type, and key characteristics
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl -z-10 group-hover:bg-primary/30 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Matches</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive compatible pet suggestions in your local area
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto relative">
          <div className="relative rounded-3xl overflow-hidden bg-primary p-12 md:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/happy-dogs-and-cats-pattern-background.jpg"
                alt="Background pattern"
                width={1200}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground text-balance">
                Ready to Find Your Pet's Perfect Match?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join thousands of responsible pet owners using PetLink to connect with compatible breeding partners.
              </p>
              <Link href="/upload">
                <Button size="lg" variant="secondary" className="shadow-xl">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">PetLink</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 PetLink. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Developed by{" "}
              <Link
                href="https://www.linkedin.com/in/asim-sheikh-05342a385/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Muhammad Asim Sheikh
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
