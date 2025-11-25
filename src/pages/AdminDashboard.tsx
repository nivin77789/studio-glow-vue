import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, X, Moon, Sun, Sparkles, Camera, LogOut, GraduationCap, Phone, User, Building2, Users, Palette, Music, Mic2, Plus, Edit, ExternalLink, MapPin, MessageSquare, Mail, Inbox, Trash2, CheckCircle, Star, Film } from "lucide-react";
import { toast } from "sonner";
import AdminTestimonials from "@/components/AdminTestimonials";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
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

interface CourseEnrollment {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  about: string;
  courseTitle: string;
  courseDuration: string;
  courseLevel: string;
  enrollmentDate: string;
  timestamp: any;
  status?: string;
}

interface CollaborationRequest {
  id: string;
  serviceName: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  timestamp: any;
  status: string;
}

interface Collaborator {
  id: string;
  category: string;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  location: string;
  whatsappNumber: string;
  contactNumber: string;
  email: string;
  website?: string;
}

const serviceIcons: { [key: string]: any } = {
  "Wedding Halls": Building2,
  "Party Halls": Users,
  "Interior Designers": Palette,
  "Makeup Artists": Sparkles,
  "Orchestra": Music,
  "DJ Services": Mic2,
  "Photography": Camera,
  "Videography": Camera,
  "Catering": Users,
  "Decoration": Sparkles,
  "Other": Users
};

const collaboratorCategories = [
  "Wedding Halls",
  "Party Halls",
  "Interior Designers",
  "Makeup Artists",
  "Orchestra",
  "DJ Services",
];

const galleryCategories = [
  "Wedding",
  "Engagement",
  "Maternity",
  "House Warming",
  "Birthday",
  "Stories",
  "NamingCeremony",
  "Concert",
  "Haldi",
  "Reception",
  "Annaprashna",
  "BabyShoot",
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    const isDark = saved === "true";
    if (isDark) document.documentElement.classList.add("dark");
    return isDark;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [courseEnrollments, setCourseEnrollments] = useState<CourseEnrollment[]>([]);
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [collaboratorsList, setCollaboratorsList] = useState<Collaborator[]>([]);
  const [ratingsList, setRatingsList] = useState<any[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [newVideoCategory, setNewVideoCategory] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [showCollaboratorForm, setShowCollaboratorForm] = useState(false);
  const [editingCollaborator, setEditingCollaborator] = useState<Collaborator | null>(null);
  const [isSubmittingCollaborator, setIsSubmittingCollaborator] = useState(false);
  const [collaboratorForm, setCollaboratorForm] = useState({
    category: "",
    name: "",
    description: "",
    imageUrl: "",
    address: "",
    location: "",
    whatsappNumber: "",
    contactNumber: "",
    email: "",
    website: ""
  });

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (auth !== "true") {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

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

  // Fetch youtube videos for gallery
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "youtube_videos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setYoutubeVideos(items);
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

  // Fetch course enrollments
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "enrollments"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const enrollments: CourseEnrollment[] = [];
      snapshot.forEach((doc) => {
        enrollments.push({ id: doc.id, ...doc.data() } as CourseEnrollment);
      });
      setCourseEnrollments(enrollments);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Fetch collaboration requests
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "partnerSubmissions"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests: CollaborationRequest[] = [];
      snapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() } as CollaborationRequest);
      });
      setCollaborationRequests(requests);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Fetch collaborators list
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "collaborators"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const collabs: Collaborator[] = [];
      snapshot.forEach((doc) => {
        collabs.push({ id: doc.id, ...doc.data() } as Collaborator);
      });
      setCollaboratorsList(collabs);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Fetch ratings
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "ratings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setRatingsList(items);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast.success("Logged out successfully");
    navigate("/admin");
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

  const handleDeleteEnrollment = async (id: string) => {
    try {
      await deleteDoc(doc(db, "enrollments", id));
      toast.success("Enrollment deleted");
    } catch (error) {
      toast.error("Failed to delete enrollment");
    }
  };

  const handleMarkEnrollmentAsContacted = async (id: string) => {
    try {
      await updateDoc(doc(db, "enrollments", id), {
        status: "contacted"
      });
      toast.success("Marked as contacted");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteCollaboration = async (id: string) => {
    try {
      await deleteDoc(doc(db, "partnerSubmissions", id));
      toast.success("Collaboration request deleted");
    } catch (error) {
      toast.error("Failed to delete request");
    }
  };

  const handleMarkCollaborationAsContacted = async (id: string) => {
    try {
      await updateDoc(doc(db, "partnerSubmissions", id), {
        status: "contacted"
      });
      toast.success("Marked as contacted");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleCollaboratorFormChange = (field: string, value: string) => {
    setCollaboratorForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCollaborator(true);
    try {
      if (editingCollaborator) {
        await updateDoc(doc(db, "collaborators", editingCollaborator.id), collaboratorForm);
        toast.success("Collaborator updated successfully");
      } else {
        await addDoc(collection(db, "collaborators"), collaboratorForm);
        toast.success("Collaborator added successfully");
      }
      setShowCollaboratorForm(false);
      setEditingCollaborator(null);
      setCollaboratorForm({
        category: "",
        name: "",
        description: "",
        imageUrl: "",
        address: "",
        location: "",
        whatsappNumber: "",
        contactNumber: "",
        email: "",
        website: ""
      });
    } catch (error) {
      toast.error("Failed to save collaborator");
    } finally {
      setIsSubmittingCollaborator(false);
    }
  };

  const handleEditCollaborator = (collaborator: Collaborator) => {
    setEditingCollaborator(collaborator);
    setCollaboratorForm({
      category: collaborator.category,
      name: collaborator.name,
      description: collaborator.description,
      imageUrl: collaborator.imageUrl,
      address: collaborator.address,
      location: collaborator.location,
      whatsappNumber: collaborator.whatsappNumber,
      contactNumber: collaborator.contactNumber,
      email: collaborator.email,
      website: collaborator.website || ""
    });
    setShowCollaboratorForm(true);
  };

  const handleDeleteCollaborator = async (id: string) => {
    try {
      await deleteDoc(doc(db, "collaborators", id));
      toast.success("Collaborator deleted");
    } catch (error) {
      toast.error("Failed to delete collaborator");
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const getServiceIcon = (serviceName: string) => {
    const IconComponent = serviceIcons[serviceName] || Users;
    return <IconComponent className="w-4 h-4" />;
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="glass border-b sticky top-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-0.5 rounded-lg bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500 shadow-md">
                <div className="bg-white dark:bg-slate-800 rounded-md p-1">
                  <img src="/logo.png" alt="Trixietales" className="h-10 w-auto object-contain rounded-sm" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Trixietales</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="inline-flex items-center text-xs font-semibold uppercase bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 px-2 py-1 rounded-full">Studio Admin</span>
                  <p className="text-sm text-muted-foreground">Manage content, gallery & collaborators</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle theme">
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="collaborators" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2 bg-white/50 dark:bg-slate-800/60 p-2 rounded-lg shadow-sm overflow-x-auto">
            <TabsTrigger value="collaborators" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-sm">
              <Users className="w-4 h-4" />
              <span>Collaborators</span>
              <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                {collaboratorsList.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="collaborations" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-sm">
              <Building2 className="w-4 h-4" />
              <span>Collaborations</span>
              {collaborationRequests.filter(c => c.status !== "contacted").length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-destructive text-destructive-foreground px-2 py-0.5 text-xs font-semibold">
                  {collaborationRequests.filter(c => c.status !== "contacted").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>Enrollments</span>
              {courseEnrollments.filter(e => e.status !== "contacted").length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-destructive text-destructive-foreground px-2 py-0.5 text-xs font-semibold">
                  {courseEnrollments.filter(e => e.status !== "contacted").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-sm">
              <Inbox className="w-4 h-4" />
              <span>Contacts</span>
              {contactSubmissions.filter(c => c.status === "unread").length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-destructive text-destructive-foreground px-2 py-0.5 text-xs font-semibold">
                  {contactSubmissions.filter(c => c.status === "unread").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-sm">
              <Mail className="w-4 h-4" />
              <span>Newsletter</span>
              <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                {newsletterSubscribers.length} subscribers
              </span>
            </TabsTrigger>
            <TabsTrigger value="ratings" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-sm">
              <Star className="w-4 h-4" />
              <span>Ratings</span>
              <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                {ratingsList.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="gallery-videos" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-sm">
              <Film className="w-4 h-4" />
              <span>Gallery Videos</span>
              <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                {youtubeVideos.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>Testimonials</span>
            </TabsTrigger>
          </TabsList>

          {/* Collaborators Management Section */}
          <TabsContent value="collaborators">
            <Card className="animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Manage Collaborators
                      <span className="inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                        {collaboratorsList.length} total
                      </span>
                    </CardTitle>
                    <CardDescription>Add and manage collaborators by category</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setEditingCollaborator(null);
                    setShowCollaboratorForm(true);
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Collaborator
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collaboratorsList.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No collaborators added yet</p>
                  ) : (
                    collaboratorsList.map((collaborator) => (
                      <Card key={collaborator.id} className="p-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={collaborator.imageUrl}
                            alt={collaborator.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-lg">{collaborator.name}</h4>
                                <span className="inline-flex items-center rounded-full border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold">
                                  {collaborator.category}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditCollaborator(collaborator)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteCollaborator(collaborator.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{collaborator.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{collaborator.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span>{collaborator.contactNumber}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{collaborator.email}</span>
                              </div>
                              {collaborator.website && (
                                <div className="flex items-center gap-1">
                                  <ExternalLink className="w-3 h-3" />
                                  <a href={collaborator.website} target="_blank" rel="noopener noreferrer" className="truncate hover:text-primary">
                                    Website
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="testimonials">
            <AdminTestimonials />
          </TabsContent>
          {/* Collaborations Section */}
          <TabsContent value="collaborations">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Collaboration Requests
                  <span className="inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                    {collaborationRequests.length} total
                  </span>
                </CardTitle>
                <CardDescription>View and manage partnership requests from service providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collaborationRequests.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No collaboration requests yet</p>
                  ) : (
                    collaborationRequests.map((request) => (
                      <Card key={request.id} className={`p-4 ${request.status !== "contacted" ? "shadow-lg ring-2 ring-primary/20" : ""}`}>
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-lg">{request.name}</h4>
                                {request.status !== "contacted" && (
                                  <span className="inline-flex items-center rounded-full border-transparent bg-primary text-primary-foreground px-2 py-0.5 text-xs font-semibold">
                                    New
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1.5 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  {getServiceIcon(request.serviceName)}
                                  <span className="font-medium text-foreground">{request.serviceName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Mail className="w-4 h-4" />
                                  <span>{request.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Phone className="w-4 h-4" />
                                  <span>{request.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <User className="w-4 h-4" />
                                  <span className="text-xs">{request.address}</span>
                                </div>
                              </div>

                              <p className="text-xs text-muted-foreground mt-2">
                                Submitted: {formatDate(request.timestamp)}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              {request.status !== "contacted" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMarkCollaborationAsContacted(request.id)}
                                  title="Mark as contacted"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteCollaboration(request.id)}
                                title="Delete request"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {request.message && (
                            <div className="mt-3 p-3 bg-muted rounded-lg">
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Additional Message:</p>
                              <p className="text-sm">{request.message}</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enrollments Section */}
          <TabsContent value="enrollments">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Course Enrollments
                  <span className="inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                    {courseEnrollments.length} total
                  </span>
                </CardTitle>
                <CardDescription>View and manage student course enrollments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseEnrollments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No course enrollments yet</p>
                  ) : (
                    courseEnrollments.map((enrollment) => (
                      <Card key={enrollment.id} className={`p-4 ${enrollment.status !== "contacted" ? "shadow-lg ring-2 ring-primary/20" : ""}`}>
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-lg">{enrollment.studentName}</h4>
                                {enrollment.status !== "contacted" && (
                                  <span className="inline-flex items-center rounded-full border-transparent bg-primary text-primary-foreground px-2 py-0.5 text-xs font-semibold">
                                    New
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1.5 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Mail className="w-4 h-4" />
                                  <span>{enrollment.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Phone className="w-4 h-4" />
                                  <span>{enrollment.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <GraduationCap className="w-4 h-4" />
                                  <span className="font-medium text-foreground">{enrollment.courseTitle}</span>
                                </div>
                              </div>

                              <div className="flex gap-2 mt-2">
                                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
                                  {enrollment.courseDuration}
                                </span>
                                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
                                  {enrollment.courseLevel}
                                </span>
                              </div>

                              <p className="text-xs text-muted-foreground mt-2">
                                Enrolled: {formatDate(enrollment.timestamp)}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              {enrollment.status !== "contacted" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMarkEnrollmentAsContacted(enrollment.id)}
                                  title="Mark as contacted"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteEnrollment(enrollment.id)}
                                title="Delete enrollment"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {enrollment.about && (
                            <div className="mt-3 p-3 bg-muted rounded-lg">
                              <p className="text-xs font-semibold text-muted-foreground mb-1">About Student:</p>
                              <p className="text-sm">{enrollment.about}</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Section */}
          <TabsContent value="contacts">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="w-5 h-5" />
                  Contact Submissions
                  <span className="inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                    {contactSubmissions.length} total
                  </span>
                </CardTitle>
                <CardDescription>View and manage contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactSubmissions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No contact submissions yet</p>
                  ) : (
                    contactSubmissions.map((submission) => (
                      <Card key={submission.id} className={`p-4 ${submission.status === "unread" ? "shadow-lg ring-2 ring-primary/20" : ""}`}>
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{submission.name}</h4>
                                {submission.status === "unread" && (
                                  <span className="inline-flex items-center rounded-full border-transparent bg-primary text-primary-foreground px-2 py-0.5 text-xs font-semibold">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{submission.email}</p>
                              {submission.phone && (
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <Phone className="w-3 h-3" />
                                  {submission.phone}
                                </p>
                              )}
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
                  <span className="inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                    {newsletterSubscribers.length} subscribers
                  </span>
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
                            Delete
                          </Button>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ratings Section */}
          <TabsContent value="ratings">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Customer Ratings
                  <span className="inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                    {ratingsList.length} total
                  </span>
                </CardTitle>
                <CardDescription>View ratings left by customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ratingsList.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No ratings yet</p>
                  ) : (
                    ratingsList.map((r) => (
                      <Card key={r.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold">{r.customerName || 'Anonymous'}</h4>
                              <div className="inline-flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < (r.rating || 0) ? 'text-amber-500' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground ml-3">{r.page}</span>
                            </div>
                            {r.comment && (
                              <p className="text-sm text-muted-foreground mb-2">{r.comment}</p>
                            )}
                            <p className="text-xs text-muted-foreground">Submitted: {formatDate(r.createdAt)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="destructive" onClick={async () => { try { await deleteDoc(doc(db, 'ratings', r.id)); toast.success('Rating deleted'); } catch { toast.error('Failed to delete rating'); } }}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Videos Section */}
          <TabsContent value="gallery-videos">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="w-5 h-5" />
                  Gallery YouTube Videos
                  <span className="inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                    {youtubeVideos.length} total
                  </span>
                </CardTitle>
                <CardDescription>Add YouTube videos mapped to gallery categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <form onSubmit={async (e) => { e.preventDefault(); setIsAddingVideo(true); try { await addDoc(collection(db, 'youtube_videos'), { category: newVideoCategory, url: newVideoUrl, title: newVideoTitle || null, createdAt: serverTimestamp(), }); setNewVideoCategory(''); setNewVideoUrl(''); setNewVideoTitle(''); toast.success('Video added'); } catch (err) { toast.error('Failed to add video'); } finally { setIsAddingVideo(false); } }} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div>
                      <Label>Category</Label>
                      <select required value={newVideoCategory} onChange={(e) => setNewVideoCategory(e.target.value)} className="w-full px-3 py-2 border rounded">
                        <option value="">Select category</option>
                        {galleryCategories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label>YouTube URL</Label>
                      <Input required value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                    </div>
                    <div>
                      <Label>Title (optional)</Label>
                      <Input value={newVideoTitle} onChange={(e) => setNewVideoTitle(e.target.value)} placeholder="Video title" />
                    </div>
                    <div className="md:col-span-3 text-right">
                      <Button type="submit" disabled={isAddingVideo || !newVideoCategory || !newVideoUrl}>{isAddingVideo ? 'Adding...' : 'Add Video'}</Button>
                    </div>
                  </form>

                  {youtubeVideos.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No gallery videos added yet</p>
                  ) : (
                    youtubeVideos.map((v) => (
                      <Card key={v.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold">{v.title || 'YouTube Video'}</h4>
                              <span className="text-xs text-muted-foreground">{v.category}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2"><a href={v.url} target="_blank" rel="noreferrer" className="underline">Open on YouTube</a></p>
                            <p className="text-xs text-muted-foreground">Added: {formatDate(v.createdAt)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="destructive" onClick={async () => { try { await deleteDoc(doc(db, 'youtube_videos', v.id)); toast.success('Video deleted'); } catch { toast.error('Failed to delete video'); } }}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Collaborator Form Modal */}
      {showCollaboratorForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <CardHeader>
              <CardTitle>{editingCollaborator ? "Edit" : "Add"} Collaborator</CardTitle>
              <CardDescription>
                {editingCollaborator ? "Update" : "Add"} collaborator information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCollaborator} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      required
                      value={collaboratorForm.category}
                      onChange={(e) => handleCollaboratorFormChange("category", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg bg-background"
                    >
                      <option value="">Select category</option>
                      {collaboratorCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={collaboratorForm.name}
                      onChange={(e) => handleCollaboratorFormChange("name", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    required
                    value={collaboratorForm.description}
                    onChange={(e) => handleCollaboratorFormChange("description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL *</Label>
                  <Input
                    id="imageUrl"
                    required
                    type="url"
                    value={collaboratorForm.imageUrl}
                    onChange={(e) => handleCollaboratorFormChange("imageUrl", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      required
                      value={collaboratorForm.location}
                      onChange={(e) => handleCollaboratorFormChange("location", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      required
                      value={collaboratorForm.address}
                      onChange={(e) => handleCollaboratorFormChange("address", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      required
                      type="tel"
                      value={collaboratorForm.contactNumber}
                      onChange={(e) => handleCollaboratorFormChange("contactNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
                    <Input
                      id="whatsappNumber"
                      required
                      type="tel"
                      value={collaboratorForm.whatsappNumber}
                      onChange={(e) => handleCollaboratorFormChange("whatsappNumber", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      required
                      type="email"
                      value={collaboratorForm.email}
                      onChange={(e) => handleCollaboratorFormChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      value={collaboratorForm.website}
                      onChange={(e) => handleCollaboratorFormChange("website", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCollaboratorForm(false);
                      setEditingCollaborator(null);
                      setCollaboratorForm({
                        category: "",
                        name: "",
                        description: "",
                        imageUrl: "",
                        address: "",
                        location: "",
                        whatsappNumber: "",
                        contactNumber: "",
                        email: "",
                        website: ""
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmittingCollaborator}>
                    {isSubmittingCollaborator ? "Saving..." : editingCollaborator ? "Update Collaborator" : "Add Collaborator"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;