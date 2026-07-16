"use client";

const messages = [
  "Free Shipping on Orders Over $50",
  "365-Day Quality Guarantee",
  "Get 15% Off Your First Order — Code: ELKO15",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper text-xs tracking-wide overflow-hidden">
      <div className="flex items-center h-9 whitespace-nowrap">
        <div className="flex animate-marquee">
          {[...messages, ...messages].map((m, i) => (
            <span key={i} className="flex items-center gap-2 px-8">
              <span className="w-1 h-1 rounded-full bg-gold" />
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
