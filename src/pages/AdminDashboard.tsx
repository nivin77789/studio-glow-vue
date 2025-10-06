import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, LogOut, Image, BookOpen, Users, MessageSquare, Mail, Inbox, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: any;
  status: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  timestamp: any;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (auth !== "true") {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Fetch contact submissions
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "contactSubmissions"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const submissions: ContactSubmission[] = [];
      snapshot.forEach((doc) => {
        submissions.push({ id: doc.id, ...doc.data() } as ContactSubmission);
      });
      setContactSubmissions(submissions);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Fetch newsletter subscribers
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "newsletterSubscribers"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subscribers: NewsletterSubscriber[] = [];
      snapshot.forEach((doc) => {
        subscribers.push({ id: doc.id, ...doc.data() } as NewsletterSubscriber);
      });
      setNewsletterSubscribers(subscribers);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const handleSave = (section: string) => {
    toast.success(`${section} updated successfully!`);
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteDoc(doc(db, "contactSubmissions", id));
      toast.success("Contact submission deleted");
    } catch (error) {
      toast.error("Failed to delete submission");
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, "contactSubmissions", id), {
        status: "read"
      });
      toast.success("Marked as read");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    try {
      await deleteDoc(doc(db, "newsletterSubscribers", id));
      toast.success("Subscriber deleted");
    } catch (error) {
      toast.error("Failed to delete subscriber");
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="glass border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Camera className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your studio content</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="contacts" className="relative">
              <Inbox className="w-4 h-4 mr-2" />
              Contacts
              {contactSubmissions.filter(c => c.status === "unread").length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 min-w-5 p-1 text-xs">
                  {contactSubmissions.filter(c => c.status === "unread").length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="newsletter">
              <Mail className="w-4 h-4 mr-2" />
              Newsletter
            </TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="founder">Founder</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          {/* Contacts Section */}
          <TabsContent value="contacts">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="w-5 h-5" />
                  Contact Submissions
                  <Badge variant="secondary">{contactSubmissions.length} total</Badge>
                </CardTitle>
                <CardDescription>View and manage contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactSubmissions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No contact submissions yet</p>
                  ) : (
                    contactSubmissions.map((submission) => (
                      <Card key={submission.id} className={`p-4 ${submission.status === "unread" ? "border-primary" : ""}`}>
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{submission.name}</h4>
                                {submission.status === "unread" && (
                                  <Badge variant="default" className="text-xs">New</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{submission.email}</p>
                              <p className="text-xs text-muted-foreground mt-1">{formatDate(submission.timestamp)}</p>
                            </div>
                            <div className="flex gap-2">
                              {submission.status === "unread" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMarkAsRead(submission.id)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteContact(submission.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm">{submission.message}</p>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsletter Section */}
          <TabsContent value="newsletter">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Newsletter Subscribers
                  <Badge variant="secondary">{newsletterSubscribers.length} subscribers</Badge>
                </CardTitle>
                <CardDescription>Manage newsletter email list</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {newsletterSubscribers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No subscribers yet</p>
                  ) : (
                    newsletterSubscribers.map((subscriber) => (
                      <Card key={subscriber.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{subscriber.email}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(subscriber.timestamp)}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Hero Section
                </CardTitle>
                <CardDescription>Manage hero carousel content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Slide 1 Title</Label>
                  <Input defaultValue="Capturing Moments" />
                </div>
                <div>
                  <Label>Slide 1 Highlight</Label>
                  <Input defaultValue="Creating Memories" />
                </div>
                <div>
                  <Label>Slide 1 Description</Label>
                  <Textarea defaultValue="Professional photography and videography services..." />
                </div>
                <Button onClick={() => handleSave("Hero Section")}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Founder Section */}
          <TabsContent value="founder">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Founder Information
                </CardTitle>
                <CardDescription>Update founder details and bio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input defaultValue="John Nivin" />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input defaultValue="Founder & Lead Photographer" />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Textarea 
                    rows={6}
                    defaultValue="With over 15 years of experience in photography and videography..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Instagram</Label>
                    <Input placeholder="Instagram URL" />
                  </div>
                  <div>
                    <Label>Facebook</Label>
                    <Input placeholder="Facebook URL" />
                  </div>
                </div>
                <Button onClick={() => handleSave("Founder Information")}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Section */}
          <TabsContent value="courses">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Courses Management
                </CardTitle>
                <CardDescription>Add or edit course offerings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Course Name</Label>
                  <Input placeholder="e.g., Professional Photography Basics" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Duration</Label>
                    <Input placeholder="e.g., 8 weeks" />
                  </div>
                  <div>
                    <Label>Level</Label>
                    <Input placeholder="e.g., Beginner" />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Course description..." />
                </div>
                <Button onClick={() => handleSave("Courses")}>Add Course</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Section */}
          <TabsContent value="services">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Services Management
                </CardTitle>
                <CardDescription>Manage service offerings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Service Name</Label>
                  <Input placeholder="e.g., Wedding Photography" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Service description..." />
                </div>
                <div>
                  <Label>Price Range</Label>
                  <Input placeholder="e.g., $500 - $2000" />
                </div>
                <Button onClick={() => handleSave("Services")}>Add Service</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Section */}
          <TabsContent value="portfolio">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Portfolio Management
                </CardTitle>
                <CardDescription>Upload and manage portfolio images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Image Title</Label>
                  <Input placeholder="e.g., Elegant Wedding Ceremony" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input placeholder="e.g., Wedding" />
                </div>
                <div>
                  <Label>Image Upload</Label>
                  <Input type="file" accept="image/*" />
                </div>
                <Button onClick={() => handleSave("Portfolio")}>Upload Image</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Section */}
          <TabsContent value="testimonials">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Testimonials Management
                </CardTitle>
                <CardDescription>Add or edit client testimonials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Client Name</Label>
                  <Input placeholder="e.g., Sarah Johnson" />
                </div>
                <div>
                  <Label>Service</Label>
                  <Input placeholder="e.g., Wedding Photography" />
                </div>
                <div>
                  <Label>Rating (1-5)</Label>
                  <Input type="number" min="1" max="5" defaultValue="5" />
                </div>
                <div>
                  <Label>Testimonial</Label>
                  <Textarea placeholder="Client feedback..." rows={4} />
                </div>
                <Button onClick={() => handleSave("Testimonials")}>Add Testimonial</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
