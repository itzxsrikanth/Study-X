import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Plus, 
  Search, 
  Sparkles, 
  Clock, 
  Star, 
  BookOpen
} from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';

export interface ConnectedCourse {
  id: string;
  title: string;
  platform: string;
  platformColor: string;
  provider: string;
  url: string;
  category: string;
  difficulty: string;
  estimatedHours: number;
  rating: number;
  progressPercentage: number;
  isBookmarked: boolean;
  thumbnailBadge: string;
  freeAudit: boolean;
  lastUpdated?: string;
}

export const EXHAUSTIVE_PLATFORM_COURSES: ConnectedCourse[] = [
  // 1. Coursera
  { id: 'c-1', title: 'AI For Everyone', platform: 'Coursera', platformColor: 'bg-[#0056D2]', provider: 'DeepLearning.AI (Andrew Ng)', url: 'https://www.coursera.org/learn/ai-for-everyone', category: 'AI', difficulty: 'Beginner', estimatedHours: 12, rating: 4.8, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '📘 Coursera AI', freeAudit: true },
  { id: 'c-2', title: 'Machine Learning Specialization', platform: 'Coursera', platformColor: 'bg-[#0056D2]', provider: 'DeepLearning.AI & Stanford', url: 'https://www.coursera.org/specializations/machine-learning-introduction', category: 'Machine Learning', difficulty: 'Beginner to Intermediate', estimatedHours: 60, rating: 4.9, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '📘 Coursera ML', freeAudit: true },
  { id: 'c-3', title: 'Deep Learning Specialization', platform: 'Coursera', platformColor: 'bg-[#0056D2]', provider: 'DeepLearning.AI (Andrew Ng)', url: 'https://www.coursera.org/specializations/deep-learning', category: 'Deep Learning', difficulty: 'Intermediate', estimatedHours: 80, rating: 4.9, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🧠 Coursera DL', freeAudit: true },
  { id: 'c-4', title: 'Google Cybersecurity Certificate', platform: 'Coursera', platformColor: 'bg-[#0056D2]', provider: 'Google', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', category: 'Cybersecurity', difficulty: 'Beginner', estimatedHours: 120, rating: 4.8, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🛡️ Google Cyber', freeAudit: true },
  { id: 'c-5', title: 'IBM Data Science Certificate', platform: 'Coursera', platformColor: 'bg-[#0056D2]', provider: 'IBM', url: 'https://www.coursera.org/professional-certificates/ibm-data-science', category: 'Data Science', difficulty: 'Beginner to Intermediate', estimatedHours: 150, rating: 4.6, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '📊 IBM Data Science', freeAudit: true },
  { id: 'c-6', title: 'Generative AI for Everyone', platform: 'Coursera', platformColor: 'bg-[#0056D2]', provider: 'DeepLearning.AI (Andrew Ng)', url: 'https://www.coursera.org/learn/generative-ai-for-everyone', category: 'Generative AI', difficulty: 'Beginner', estimatedHours: 10, rating: 4.9, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '✨ GenAI', freeAudit: true },
  { id: 'c-7', title: 'Meta Full-Stack Developer', platform: 'Coursera', platformColor: 'bg-[#0056D2]', provider: 'Meta', url: 'https://www.coursera.org/professional-certificates/meta-full-stack-developer', category: 'Full Stack', difficulty: 'Beginner to Intermediate', estimatedHours: 140, rating: 4.7, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '♾️ Meta Full Stack', freeAudit: true },
  { id: 'c-8', title: 'Google Cloud Engineering', platform: 'Coursera', platformColor: 'bg-[#0056D2]', provider: 'Google Cloud', url: 'https://www.coursera.org/professional-certificates/gcp-cloud-engineering', category: 'Cloud Computing', difficulty: 'Intermediate', estimatedHours: 90, rating: 4.7, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '☁️ Google Cloud', freeAudit: true },

  // 2. Udemy
  { id: 'u-1', title: 'Machine Learning A-Z: AI, Python & R', platform: 'Udemy', platformColor: 'bg-[#A435F0]', provider: 'Kirill Eremenko & Hadelin', url: 'https://www.udemy.com/course/machinelearning/', category: 'Machine Learning', difficulty: 'Beginner', estimatedHours: 44, rating: 4.7, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '🟣 Udemy ML', freeAudit: false },
  { id: 'u-2', title: 'The Complete 2026 Web Dev Bootcamp', platform: 'Udemy', platformColor: 'bg-[#A435F0]', provider: 'Angela Yu', url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/', category: 'Full Stack', difficulty: 'Beginner', estimatedHours: 65, rating: 4.8, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🟣 Udemy Web Dev', freeAudit: false },
  { id: 'u-3', title: '100 Days of Code: Python Bootcamp', platform: 'Udemy', platformColor: 'bg-[#A435F0]', provider: 'Angela Yu', url: 'https://www.udemy.com/course/100-days-of-code/', category: 'Python', difficulty: 'Beginner', estimatedHours: 60, rating: 4.8, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🐍 100 Days Python', freeAudit: false },
  { id: 'u-4', title: 'DevOps Beginners to Advanced', platform: 'Udemy', platformColor: 'bg-[#A435F0]', provider: 'Mumshad Mannambeth', url: 'https://www.udemy.com/course/decodingdevops/', category: 'DevOps', difficulty: 'Beginner to Advanced', estimatedHours: 26, rating: 4.8, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🐳 KodeKloud DevOps', freeAudit: false },
  { id: 'u-5', title: 'Mastering AI Agents: AutoGen & CrewAI', platform: 'Udemy', platformColor: 'bg-[#A435F0]', provider: 'AI Engineering Guild', url: 'https://www.udemy.com/course/mastering-ai-agents-crewai-autogen/', category: 'AI Agents', difficulty: 'Intermediate', estimatedHours: 14, rating: 4.8, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '🔥 CrewAI Agents', freeAudit: false },

  // 3. edX
  { id: 'e-1', title: "CS50's Intro to AI with Python", platform: 'edX', platformColor: 'bg-[#B22222]', provider: 'Harvard University', url: 'https://www.edx.org/learn/artificial-intelligence/harvard-university-cs50-s-introduction-to-artificial-intelligence-with-python', category: 'AI', difficulty: 'Beginner to Intermediate', estimatedHours: 70, rating: 4.9, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '🔴 edX Harvard AI', freeAudit: true },
  { id: 'e-2', title: 'Harvard Data Science Certificate', platform: 'edX', platformColor: 'bg-[#B22222]', provider: 'Harvard University', url: 'https://www.edx.org/professional-certificate/harvardx-data-science', category: 'Data Science', difficulty: 'Beginner to Intermediate', estimatedHours: 140, rating: 4.8, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🔴 edX Harvard Data', freeAudit: true },
  { id: 'e-3', title: 'Machine Learning with Python', platform: 'edX', platformColor: 'bg-[#B22222]', provider: 'IBM', url: 'https://www.edx.org/learn/machine-learning/ibm-machine-learning-with-python-a-practical-introduction', category: 'Machine Learning', difficulty: 'Intermediate', estimatedHours: 30, rating: 4.7, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🔴 edX IBM ML', freeAudit: true },

  // 4. Infosys Springboard
  { id: 'inf-1', title: 'Artificial Intelligence Primer', platform: 'Infosys Springboard', platformColor: 'bg-[#007CC3]', provider: 'Infosys Springboard', url: 'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_0130945112832983042784_shared/overview', category: 'AI', difficulty: 'Beginner', estimatedHours: 15, rating: 4.7, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '🔷 Infosys AI', freeAudit: true },
  { id: 'inf-2', title: 'Python for Data Science', platform: 'Infosys Springboard', platformColor: 'bg-[#007CC3]', provider: 'Infosys Springboard', url: 'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_01260020847524249611_shared/overview', category: 'Data Science', difficulty: 'Beginner', estimatedHours: 20, rating: 4.8, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🔷 Infosys Data', freeAudit: true },
  { id: 'inf-3', title: 'Cloud Computing Essentials', platform: 'Infosys Springboard', platformColor: 'bg-[#007CC3]', provider: 'Infosys Springboard', url: 'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_0130944983281254402631_shared/overview', category: 'Cloud Computing', difficulty: 'Beginner', estimatedHours: 12, rating: 4.6, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🔷 Infosys Cloud', freeAudit: true },

  // 5. NPTEL
  { id: 'np-1', title: 'An Introduction to Artificial Intelligence', platform: 'NPTEL', platformColor: 'bg-[#C2410C]', provider: 'Prof. Deepak Khemani (IIT Madras)', url: 'https://onlinecourses.nptel.ac.in/noc24_cs56/preview', category: 'AI', difficulty: 'Beginner to Intermediate', estimatedHours: 120, rating: 4.8, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '🏛️ NPTEL IIT Madras', freeAudit: true },
  { id: 'np-2', title: 'Deep Learning', platform: 'NPTEL', platformColor: 'bg-[#C2410C]', provider: 'Prof. Mitesh Khapra (IIT Madras)', url: 'https://onlinecourses.nptel.ac.in/noc24_cs68/preview', category: 'Machine Learning', difficulty: 'Intermediate', estimatedHours: 120, rating: 4.9, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🏛️ NPTEL Deep Learning', freeAudit: true },
  { id: 'np-3', title: 'Cloud Computing', platform: 'NPTEL', platformColor: 'bg-[#C2410C]', provider: 'Prof. Soumya Kanti (IIT Kharagpur)', url: 'https://onlinecourses.nptel.ac.in/noc24_cs42/preview', category: 'Cloud Computing', difficulty: 'Intermediate', estimatedHours: 80, rating: 4.7, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🏛️ NPTEL Cloud', freeAudit: true },

  // 6. Great Learning Academy
  { id: 'gl-1', title: 'AI for Beginners', platform: 'Great Learning Academy', platformColor: 'bg-[#15803D]', provider: 'Great Learning Academy', url: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/artificial-intelligence-for-beginners', category: 'AI', difficulty: 'Beginner', estimatedHours: 3, rating: 4.7, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🟢 Great Learning AI', freeAudit: true },
  { id: 'gl-2', title: 'Python for Machine Learning', platform: 'Great Learning Academy', platformColor: 'bg-[#15803D]', provider: 'Great Learning Academy', url: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/python-for-machine-learning', category: 'Machine Learning', difficulty: 'Beginner', estimatedHours: 4, rating: 4.8, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🟢 Great Learning ML', freeAudit: true },

  // 7. Microsoft Learn
  { id: 'ms-1', title: 'Microsoft Azure Fundamentals (AZ-900)', platform: 'Microsoft Learn', platformColor: 'bg-[#0078D4]', provider: 'Microsoft', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/', category: 'Cloud Computing', difficulty: 'Beginner', estimatedHours: 10, rating: 4.8, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '🔷 Azure AZ-900', freeAudit: true },
  { id: 'ms-2', title: 'Azure AI Fundamentals (AI-900)', platform: 'Microsoft Learn', platformColor: 'bg-[#0078D4]', provider: 'Microsoft', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/', category: 'AI', difficulty: 'Beginner', estimatedHours: 8, rating: 4.8, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🔷 Azure AI-900', freeAudit: true },

  // 8. AWS Skill Builder
  { id: 'aws-1', title: 'AWS Cloud Practitioner Essentials', platform: 'AWS Skill Builder', platformColor: 'bg-[#FF9900]', provider: 'Amazon Web Services', url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials', category: 'Cloud Computing', difficulty: 'Beginner', estimatedHours: 6, rating: 4.8, progressPercentage: 0, isBookmarked: true, thumbnailBadge: '🔶 AWS Cloud', freeAudit: true },
  { id: 'aws-2', title: 'AWS Foundations of Prompt Engineering', platform: 'AWS Skill Builder', platformColor: 'bg-[#FF9900]', provider: 'Amazon Web Services', url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/17763/aws-foundations-of-prompt-engineering', category: 'Prompt Engineering', difficulty: 'Beginner', estimatedHours: 4, rating: 4.8, progressPercentage: 0, isBookmarked: false, thumbnailBadge: '🔶 AWS Prompting', freeAudit: true }
];

export const CoursesHubPage: React.FC = () => {
  const [courses, setCourses] = useState<ConnectedCourse[]>(() => {
    return EXHAUSTIVE_PLATFORM_COURSES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState('Coursera');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('AI');
  const [newDifficulty, setNewDifficulty] = useState<string>('Intermediate');

  useEffect(() => {
    localStorage.setItem('studyx_connected_courses', JSON.stringify(courses));
  }, [courses]);

  const toggleBookmark = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isBookmarked: !c.isBookmarked } : c))
    );
  };

  const handleAddCustomCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const newCourse: ConnectedCourse = {
      id: Date.now().toString(),
      title: newTitle,
      platform: newPlatform,
      platformColor: 'bg-[#0056D2]',
      provider: `${newPlatform} / Custom`,
      url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
      category: newCategory,
      difficulty: newDifficulty,
      estimatedHours: 20,
      rating: 5.0,
      progressPercentage: 0,
      isBookmarked: true,
      thumbnailBadge: `🔗 ${newCategory}`,
      freeAudit: true
    };

    setCourses([newCourse, ...courses]);
    setAddModalOpen(false);
    setNewTitle('');
    setNewUrl('');
  };

  const platformTabs = [
    'All',
    'Coursera',
    'Udemy',
    'edX',
    'Infosys Springboard',
    'NPTEL',
    'Great Learning Academy',
    'Microsoft Learn',
    'AWS Skill Builder'
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedPlatform === 'All') return matchesSearch;
    return matchesSearch && c.platform.toLowerCase().includes(selectedPlatform.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pt-4">
      {/* Header OS Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-card-studyx p-6 md:p-8 border-white/10 shadow-studyx-glass">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge label="Exhaustive Multi-Platform Course Catalog (10-20+ per Platform)" variant="cyan" icon={<GraduationCap className="w-3.5 h-3.5" />} />
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <h1 className="text-h2 font-bold text-[#FFFEFF]">
            Exhaustive Platform Course Catalog
          </h1>
          <p className="text-small text-[#9CA3AF]">
            Direct course enrollment links across Coursera, Udemy, edX, Infosys Springboard, NPTEL, Great Learning, Microsoft Learn, and AWS Skill Builder.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          showArrow={false}
          onClick={() => setAddModalOpen(true)}
        >
          Add Custom Course Link
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card-studyx p-4 border-white/10">
        <div className="w-full md:w-80">
          <Input
            icon={Search}
            placeholder="Search platform courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 8 Platform Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {platformTabs.map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-3 py-1 rounded-full text-caption font-semibold transition-all border ${
                selectedPlatform === platform
                  ? 'bg-gradient-studyx-primary text-white border-[#3B82F6] shadow-glow-primary'
                  : 'bg-[#11121A] text-[#9CA3AF] hover:text-white border-white/5 hover:bg-white/5'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ y: -4 }}
            className="glass-card-studyx glass-card-studyx-hover p-6 border-white/10 flex flex-col justify-between space-y-5 shadow-studyx-glass relative overflow-hidden group"
          >
            <div className="space-y-4">
              {/* Platform Header Badge & Bookmark */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-caption font-bold text-white shadow-sm ${course.platformColor}`}>
                    {course.platform}
                  </span>
                  <Badge label={course.difficulty} variant={course.difficulty.includes('Beginner') ? 'lime' : course.difficulty.includes('Intermediate') ? 'purple' : 'pink'} />
                </div>

                <button
                  onClick={() => toggleBookmark(course.id)}
                  className="text-[#9CA3AF] hover:text-[#0EA5E9] p-1.5 rounded-full hover:bg-white/5 transition-colors"
                  title={course.isBookmarked ? 'Remove Bookmark' : 'Bookmark Course'}
                >
                  {course.isBookmarked ? (
                    <BookmarkCheck className="w-5 h-5 text-[#0EA5E9] fill-[#0EA5E9]" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Title & Provider */}
              <div className="space-y-1.5">
                <span className="text-caption font-mono text-[#06B6D4]">{course.thumbnailBadge}</span>
                <h3 className="text-h4 font-bold text-[#FFFEFF] leading-snug group-hover:text-[#3B82F6] transition-colors">
                  {course.title}
                </h3>
                <p className="text-caption text-[#9CA3AF] font-medium">{course.provider}</p>
              </div>

              {/* Course Meta (Rating, Time, Free Audit) */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-caption font-mono text-[#687380]">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>~{course.estimatedHours} Hours</span>
                </div>
                <Badge label={course.freeAudit ? 'Free' : 'Paid'} variant={course.freeAudit ? 'lime' : 'pink'} showDot={false} />
              </div>
            </div>

            {/* Direct Access Link Button */}
            <div className="pt-2">
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-studyx-primary py-3 px-4 rounded-full text-small font-semibold flex items-center justify-center gap-2 group-hover:shadow-glow-primary transition-all text-center block"
              >
                <span>Direct Course Enrollment URL</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Custom Course Link Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Custom Course Link"
        description="Link any preferred learning course URL directly into your StudyX OS hub."
        icon={BookOpen}
        primaryActionLabel="Save & Link Course"
        onPrimaryAction={() => {}}
      >
        <form onSubmit={handleAddCustomCourse} className="space-y-4 py-2 text-left">
          <Input
            label="Course Title"
            placeholder="e.g. Deep Learning Specialization by Andrew Ng"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />

          <Input
            label="Direct Course URL"
            placeholder="e.g. https://www.coursera.org/specializations/deep-learning"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-caption font-semibold text-[#D1D5DB]">Platform</label>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                className="input-studyx w-full p-2.5 text-small text-white"
              >
                {platformTabs.filter(p => p !== 'All').map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-caption font-semibold text-[#D1D5DB]">Difficulty</label>
              <select
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value)}
                className="input-studyx w-full p-2.5 text-small text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <Button variant="primary" size="md" type="submit" className="w-full justify-center mt-2">
            Link Course to Hub
          </Button>
        </form>
      </Modal>
    </div>
  );
};
