import { BookOpen, Calculator, Globe, Microscope, Palette, Users, Brain, Heart, Dumbbell, Monitor, Languages } from "lucide-react";
import { Link } from "react-router-dom";

interface SubjectCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  isOptional?: boolean;
  subjectId?: string;
}

const SubjectCard = ({ title, description, icon, color, isOptional = false, subjectId }: SubjectCardProps) => {
  const getIcon = (iconName: string) => {
    const iconClass = `w-8 h-8 ${color}`;
    switch (iconName) {
      case 'book': return <BookOpen className={iconClass} />;
      case 'calculator': return <Calculator className={iconClass} />;
      case 'globe': return <Globe className={iconClass} />;
      case 'microscope': return <Microscope className={iconClass} />;
      case 'palette': return <Palette className={iconClass} />;
      case 'users': return <Users className={iconClass} />;
      case 'brain': return <Brain className={iconClass} />;
      case 'heart': return <Heart className={iconClass} />;
      case 'dumbbell': return <Dumbbell className={iconClass} />;
      case 'monitor': return <Monitor className={iconClass} />;
      case 'languages': return <Languages className={iconClass} />;
      default: return <BookOpen className={iconClass} />;
    }
  };

  return (
    <Link to={`/subject/${subjectId}`} className="block">
      <div className="neomorph rounded-xl p-5 hover-lift cursor-pointer group w-[352px] h-[225.25px] flex flex-col md:w-full subject-card-mobile hover:ring-2 hover:ring-blue-500 transition-all duration-200">
        <div className="flex items-start gap-3 flex-shrink-0">
          <div className="p-2.5 bg-white rounded-lg neomorph-sm hover-scale flex-shrink-0">
            {getIcon(icon)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-500 transition-colors duration-200 text-sm truncate">
                {title}
              </h3>
              {isOptional && (
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-medium flex-shrink-0">
                  Pilihan
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100">
          <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1">
            Mulai Belajar →
          </button>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;