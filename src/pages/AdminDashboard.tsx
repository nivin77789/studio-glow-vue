import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, LogOut, Image, BookOpen, Calendar, Users, MessageSquare, Settings } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (auth !== "true") {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const handleSave = (section: string) => {
    toast.success(`${section} updated successfully!`);
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
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="founder">Founder</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

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
