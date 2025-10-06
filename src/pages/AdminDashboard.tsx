import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Inbox, Trash2, CheckCircle, Camera, LogOut, GraduationCap, Phone, User, Building2, Users, Palette, Sparkles, Music, Mic2 } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [courseEnrollments, setCourseEnrollments] = useState<CourseEnrollment[]>([]);
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);

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
        <Tabs defaultValue="collaborations" className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-2">
            <TabsTrigger value="collaborations" className="relative">
              <Building2 className="w-4 h-4 mr-2" />
              Collaborations
              {collaborationRequests.filter(c => c.status !== "contacted").length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-destructive text-destructive-foreground px-2 py-0.5 text-xs font-semibold">
                  {collaborationRequests.filter(c => c.status !== "contacted").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="relative">
              <GraduationCap className="w-4 h-4 mr-2" />
              Enrollments
              {courseEnrollments.filter(e => e.status !== "contacted").length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-destructive text-destructive-foreground px-2 py-0.5 text-xs font-semibold">
                  {courseEnrollments.filter(e => e.status !== "contacted").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="contacts" className="relative">
              <Inbox className="w-4 h-4 mr-2" />
              Contacts
              {contactSubmissions.filter(c => c.status === "unread").length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full border-transparent bg-destructive text-destructive-foreground px-2 py-0.5 text-xs font-semibold">
                  {contactSubmissions.filter(c => c.status === "unread").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="newsletter">
              <Mail className="w-4 h-4 mr-2" />
              Newsletter
            </TabsTrigger>
          </TabsList>

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
                      <Card key={request.id} className={`p-4 ${request.status !== "contacted" ? "border-primary" : ""}`}>
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
                      <Card key={enrollment.id} className={`p-4 ${enrollment.status !== "contacted" ? "border-primary" : ""}`}>
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
                      <Card key={submission.id} className={`p-4 ${submission.status === "unread" ? "border-primary" : ""}`}>
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;