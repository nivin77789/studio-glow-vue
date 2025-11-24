import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Pencil, Trash2, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
    id: string;
    clientName: string;
    category: string;
    rating: number;
    description: string;
    youtubeLink: string;
    createdAt: any;
}

const AdminTestimonials = () => {
    const [clientName, setClientName] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data: Testimonial[] = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() } as Testimonial);
            });
            setTestimonials(data);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientName || !category || rating < 1) return;
        setIsSubmitting(true);
        try {
            const data = {
                clientName,
                category,
                rating,
                description,
                youtubeLink,
                updatedAt: new Date().toISOString(),
            };

            if (editingId) {
                await updateDoc(doc(db, "testimonials", editingId), data);
                alert("Testimonial updated!");
                setEditingId(null);
            } else {
                await addDoc(collection(db, "testimonials"), {
                    ...data,
                    createdAt: new Date().toISOString(),
                });
                alert("Testimonial added!");
            }
            resetForm();
        } catch (error) {
            console.error("Error saving testimonial:", error);
            alert("Failed to save testimonial.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (t: Testimonial) => {
        setEditingId(t.id);
        setClientName(t.clientName);
        setCategory(t.category);
        setRating(t.rating);
        setDescription(t.description);
        setYoutubeLink(t.youtubeLink || "");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;
        try {
            await deleteDoc(doc(db, "testimonials", id));
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert("Failed to delete testimonial.");
        }
    };

    const resetForm = () => {
        setClientName("");
        setCategory("");
        setRating(0);
        setDescription("");
        setYoutubeLink("");
        setEditingId(null);
    };

    return (
        <div className="space-y-8 py-8 max-w-5xl mx-auto">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                        {editingId && (
                            <Button variant="ghost" onClick={resetForm} size="sm">
                                <X className="w-4 h-4 mr-2" /> Cancel Edit
                            </Button>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="clientName">Client Name</Label>
                                <Input
                                    id="clientName"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="e.g. Bride, Corporate, Event"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Rating</Label>
                            <div className="flex space-x-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-6 h-6 cursor-pointer transition-colors ${star <= rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                                        onClick={() => setRating(star)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="min-h-[100px]"
                            />
                        </div>

                        <div>
                            <Label htmlFor="youtubeLink">YouTube Video Link (optional)</Label>
                            <Input
                                id="youtubeLink"
                                value={youtubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Saving..." : (editingId ? "Update Testimonial" : "Add Testimonial")}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-xl font-bold px-1">Existing Testimonials ({testimonials.length})</h3>
                <div className="grid gap-4">
                    {testimonials.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No testimonials yet.</p>
                    ) : (
                        testimonials.map((t) => (
                            <Card key={t.id} className="overflow-hidden">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-semibold text-lg">{t.clientName}</h4>
                                                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{t.category}</span>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-3 h-3 ${i < t.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{t.description}</p>
                                            {t.youtubeLink && (
                                                <p className="text-xs text-blue-500 truncate">{t.youtubeLink}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <Button variant="outline" size="icon" onClick={() => handleEdit(t)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => handleDelete(t.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminTestimonials;
