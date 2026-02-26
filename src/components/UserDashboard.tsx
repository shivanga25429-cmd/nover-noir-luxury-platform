import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { supabase, CartRecord } from '@/lib/supabase';
import { LogOut, ShoppingBag, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserDashboard = ({ open, onOpenChange }: UserDashboardProps) => {
  const { user, userProfile, signOut } = useAuth();
  const [orders, setOrders] = useState<CartRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (open && user) {
      fetchOrders();
    }
  }, [open, user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onOpenChange(false);
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-2xl">My Dashboard</DialogTitle>
          <DialogDescription>
            Manage your profile and view your order history
          </DialogDescription>
        </DialogHeader>

        {userProfile && (
          <div className="space-y-6">
            {/* User Profile */}
            <div className="border border-border rounded-sm p-4 space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg">{userProfile.name}</h3>
                  <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{userProfile.phone_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since:</span>
                  <span>
                    {userProfile.created_at
                      ? new Date(userProfile.created_at).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Orders */}
            <div>
              <h3 className="font-cinzel text-lg mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order History
              </h3>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 border border-border rounded-sm">
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-border rounded-sm p-4 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {order.created_at
                              ? new Date(order.created_at).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })
                              : 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {order.items.length} item(s)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-cinzel text-lg">₹{order.total.toFixed(2)}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              order.is_cleared
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-yellow-500/10 text-yellow-500'
                            }`}
                          >
                            {order.is_cleared ? 'Purchased' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sign Out Button */}
            <Button
              variant="outline"
              className="w-full font-cinzel"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
