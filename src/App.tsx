import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Pages
import Home from '@/pages/home';
import About from '@/pages/about';
import Services from '@/pages/services';
import Gallery from '@/pages/gallery';
import Events from '@/pages/events';
import Booking from '@/pages/booking';
import Testimonials from '@/pages/testimonials';
import FAQ from '@/pages/faq';
import Contact from '@/pages/contact';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/events" component={Events} />
      <Route path="/booking" component={Booking} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
