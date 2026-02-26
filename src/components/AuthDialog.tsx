import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dismissable?: boolean; // Add optional prop to control dismissability
}

export const AuthDialog = ({ open, onOpenChange, dismissable = true }: AuthDialogProps) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignUpSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.name, data.phoneNumber);
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to sign up',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Account created successfully! Please check your email to verify your account.',
        });
        onOpenChange(false);
        signUpForm.reset();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignInSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to sign in',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Signed in successfully!',
        });
        onOpenChange(false);
        signInForm.reset();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={dismissable ? onOpenChange : undefined}>
      <DialogContent 
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          if (!dismissable) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissable) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-cinzel text-2xl">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </DialogTitle>
          <DialogDescription>
            {isSignUp
              ? 'Sign up to save your cart and track your orders'
              : 'Sign in to access your cart and orders'}
          </DialogDescription>
        </DialogHeader>

        {isSignUp ? (
          <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...signUpForm.register('name')}
                placeholder="Enter your name"
              />
              {signUpForm.formState.errors.name && (
                <p className="text-sm text-red-500">{signUpForm.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                {...signUpForm.register('phoneNumber')}
                placeholder="Enter your phone number"
              />
              {signUpForm.formState.errors.phoneNumber && (
                <p className="text-sm text-red-500">{signUpForm.formState.errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...signUpForm.register('email')}
                placeholder="Enter your email"
              />
              {signUpForm.formState.errors.email && (
                <p className="text-sm text-red-500">{signUpForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...signUpForm.register('password')}
                placeholder="Enter your password"
              />
              {signUpForm.formState.errors.password && (
                <p className="text-sm text-red-500">{signUpForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...signUpForm.register('confirmPassword')}
                placeholder="Confirm your password"
              />
              {signUpForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">{signUpForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full font-cinzel" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <p className="text-center text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-primary underline"
              >
                Sign In
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                {...signInForm.register('email')}
                placeholder="Enter your email"
              />
              {signInForm.formState.errors.email && (
                <p className="text-sm text-red-500">{signInForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                type="password"
                {...signInForm.register('password')}
                placeholder="Enter your password"
              />
              {signInForm.formState.errors.password && (
                <p className="text-sm text-red-500">{signInForm.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full font-cinzel" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <p className="text-center text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-primary underline"
              >
                Sign Up
              </button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
