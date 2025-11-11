import { Link } from "react-router-dom";

const ClassSection = () => {
  const classes = [
    {
      number: "7",
      grade: "Kelas 7",
      description: "Mulai petualangan belajarmu di SMP!",
      bgColor: "bg-[hsl(var(--class-7-bg))]",
      hoverBgColor: "hover:bg-[hsl(210,100%,97%)]",
      textColor: "text-[hsl(var(--class-7-accent))]",
      glowColor: "hover:[text-shadow:0_0_12px_rgba(59,130,246,0.4)]",
    },
    {
      number: "8",
      grade: "Kelas 8",
      description: "Tingkatkan pengetahuanmu di jenjang berikutnya.",
      bgColor: "bg-[hsl(var(--class-8-bg))]",
      hoverBgColor: "hover:bg-[hsl(262,100%,98%)]",
      textColor: "text-[hsl(var(--class-8-accent))]",
      glowColor: "hover:[text-shadow:0_0_12px_rgba(139,92,246,0.4)]",
    },
    {
      number: "9",
      grade: "Kelas 9",
      description: "Persiapkan dirimu menuju masa depan cerah.",
      bgColor: "bg-[hsl(var(--class-9-bg))]",
      hoverBgColor: "hover:bg-[hsl(146,57%,96%)]",
      textColor: "text-[hsl(var(--class-9-accent))]",
      glowColor: "hover:[text-shadow:0_0_12px_rgba(16,185,129,0.4)]",
    },
  ];

  return (
    <section id="kelas" className="py-16 px-6 bg-gradient-to-br from-[#F9FAFB] to-[#EEF1F5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[28px] font-semibold mb-3 text-[hsl(var(--text-navy))]">
            Pilih Kelasmu untuk Mulai Belajar 📚
          </h2>
          <p className="text-[hsl(var(--text-gray))] text-base font-['Nunito']">
            Pilih kelas sesuai tingkatanmu, lalu mulai jelajahi materi pembelajaran.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <Link
              key={classItem.grade}
              to={`/kelas-${classItem.number}`}
              className={`
                ${classItem.bgColor} ${classItem.hoverBgColor}
                rounded-[24px] p-8 text-center
                transition-all duration-200 ease-out cursor-pointer hover-lift
                fade-in
                shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)]
                hover:shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.9)]
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`text-[72px] font-extrabold leading-none mb-4 ${classItem.textColor} ${classItem.glowColor} transition-colors duration-200`}>
                {classItem.number}
              </div>
              <h3 className="text-lg font-semibold mb-2 font-['Nunito']">
                {classItem.grade}
              </h3>
              <p className="text-sm text-[hsl(var(--text-gray))] font-['Nunito']">
                {classItem.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSection;
