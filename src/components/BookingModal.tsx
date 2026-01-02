import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Tag, Calendar, ChevronRight, X, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
    id: string;
    name: string;
    description: string;
    price?: string;
    imageUrl?: string;
    category?: string;
    duration?: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!isOpen) return;

        const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const servicesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Service[];
            setServices(servicesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [isOpen]);

    const handleBook = (serviceName: string) => {
        window.location.href = `/contact?service=${encodeURIComponent(serviceName)}`;
        onClose();
    };

    const DiscountTiers = ({ isDark = false }: { isDark?: boolean }) => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
                {[
                    { range: "₹50k - ₹80k", disc: "5% OFF", label: "Starter Bundle" },
                    { range: "₹80k - ₹2L", disc: "8% OFF", label: "Pro Bundle" },
                    { range: "Above ₹2L", disc: "10% OFF", label: "Elite Bundle" }
                ].map((tier, i) => (
                    <div key={i} className={`flex flex-col p-4 rounded-2xl ${isDark ? "bg-white/5 border-white/10" : "bg-white/60 border-zinc-200"} border shadow-sm transition-all hover:scale-[1.02]`}>
                        <span className={`text-[10px] uppercase tracking-widest font-black mb-1 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>{tier.label}</span>
                        <div className="flex items-end justify-between">
                            <span className={`text-xs font-bold ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{tier.range}</span>
                            <span className="text-xl font-black text-primary tracking-tight">{tier.disc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl p-0 overflow-hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl h-[100dvh] md:h-[85vh] gap-0 flex flex-col">
                <div className="flex flex-col md:flex-row flex-1 h-full w-full overflow-hidden min-h-0">
                    {/* Desktop Left Sidebar: Bundle & Save (Hidden on Mobile) */}
                    <div className="hidden md:flex w-[380px] flex-col relative overflow-hidden bg-zinc-950 border-r border-white/5 shadow-2xl z-30 text-left shrink-0 min-h-0">
                        {/* Aesthetic Background Overlay */}
                        <div className="absolute inset-0 opacity-40">
                            <img
                                src="/images/hero1.jpeg"
                                alt="Booking Cover"
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/80 to-zinc-950 z-10" />

                        <div className="relative z-20 flex-1 flex flex-col p-10 min-h-0">
                            <div className="flex-1 overflow-y-auto scrollbar-none pr-2 min-h-0">
                                <div className="inline-flex px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/30 mb-6">
                                    Limited Time Offer
                                </div>
                                <h2 className="text-4xl font-black text-white mb-4 leading-[1.1] tracking-tighter">
                                    Bundle & <span className="text-primary italic font-light">Save Big</span>
                                </h2>
                                <p className="text-zinc-400 text-sm font-medium mb-10 leading-relaxed pr-6">
                                    Extra savings applied automatically on high-value bookings. Perfect for large weddings and events.
                                </p>

                                <DiscountTiers isDark={true} />
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/10 shrink-0">
                                <p className="text-[10px] text-zinc-500 font-medium mb-6 italic leading-relaxed">
                                    * Pricing is subject to change based on custom requirements and event complexity.
                                </p>
                                <Button
                                    variant="link"
                                    onClick={onClose}
                                    className="text-white hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest p-0 h-auto flex items-center gap-2 group"
                                >
                                    View Other Services
                                    <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Services List */}
                    <div className="flex-1 flex flex-col h-full bg-transparent min-h-0 overflow-hidden">
                        <DialogHeader className="px-4 py-3 md:p-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm z-20 text-left shrink-0">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    onClick={onClose}
                                    className="md:hidden -ml-2 h-9 px-2 gap-1 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
                                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Back</span>
                                </Button>
                                <div className="flex-1">
                                    <DialogTitle className="text-base md:text-3xl font-black tracking-tighter gradient-text text-left">Available Services</DialogTitle>
                                    <DialogDescription className="text-[8px] md:text-sm font-bold text-zinc-400 dark:text-zinc-500 text-left uppercase tracking-widest leading-none">
                                        Studio Glow Selection
                                    </DialogDescription>
                                </div>
                                <div className="hidden md:block">
                                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-4 md:p-10 pb-20 min-h-0 relative z-10 w-full touch-pan-y">
                            {loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                        <p className="text-muted-foreground animate-pulse font-bold tracking-widest uppercase text-xs">Loading magic...</p>
                                    </div>
                                </div>
                            ) : services.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
                                    <div className="p-6 rounded-full bg-primary/10">
                                        <Calendar className="w-12 h-12 text-primary/40" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black italic">No services listed yet</h3>
                                        <p className="text-muted-foreground max-w-[250px] mx-auto mt-2 font-medium">
                                            Our administrator is currently updating our offerings. Please check back soon!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-8 md:gap-10">
                                    {services.map((service, index) => (
                                        <motion.div
                                            key={service.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group relative flex flex-row items-center gap-4 md:gap-8 p-4 md:p-8 rounded-[2.5rem] bg-white/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5 backdrop-blur-md z-0"
                                        >
                                            {service.category && (
                                                <div className="hidden md:block absolute top-3 right-3 z-20">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 backdrop-blur-md shadow-sm">
                                                        {service.category}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-[2rem] overflow-hidden flex-shrink-0 shadow-xl bg-zinc-200 dark:bg-zinc-800 group-hover:scale-95 transition-transform duration-700">
                                                {service.imageUrl ? (
                                                    <img
                                                        src={service.imageUrl}
                                                        alt={service.name}
                                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-zinc-100 to-transparent">
                                                        <Sparkles className="w-8 h-8 text-primary/30" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                            </div>

                                            <div className="flex-1 min-w-0 text-left">
                                                <div className="mb-2 md:mb-4">
                                                    <h4 className="text-sm md:text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors pr-10 mb-0.5 md:mb-2">
                                                        {service.name}
                                                    </h4>
                                                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                                        {service.price && (
                                                            <div className="text-sm md:text-2xl font-black text-primary tracking-tight">
                                                                ₹{service.price.replace(/[^\d.,]/g, '')}
                                                            </div>
                                                        )}
                                                        {service.duration && (
                                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-[7px] md:text-xs font-black text-zinc-400 uppercase tracking-tighter border border-zinc-200/50 dark:border-zinc-700/50">
                                                                <Clock className="w-2.5 h-2.5" />
                                                                {service.duration}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <p className="text-[9px] md:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 md:line-clamp-3 mb-2 md:mb-6 font-medium leading-[1.4]">
                                                    {service.description}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="md:hidden">
                                                        {service.category && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20">
                                                                {service.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Button
                                                        onClick={() => handleBook(service.name)}
                                                        size="sm"
                                                        className="h-5 md:h-12 rounded-full md:rounded-2xl px-2.5 md:px-10 bg-zinc-900 dark:bg-primary text-white hover:bg-primary dark:hover:bg-primary/90 transition-all font-black text-[6px] md:text-sm shadow-lg group-hover:-translate-y-0.5 active:scale-95"
                                                    >
                                                        Book Online
                                                        <ChevronRight className="w-1.5 h-1.5 md:w-4 md:h-4 ml-1 md:ml-2 transition-transform group-hover:translate-x-0.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Offers Layout Removed as requested */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
