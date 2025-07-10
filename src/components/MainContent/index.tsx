import Section from '../Section';
import Card from '../Card';
import portfolioData from '../../data/mockData';
import { LaptopIcon, GraduationCapIcon, BuildingIcon, TrophyIcon, UserIcon, PhoneIcon, CircleIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { BuildingOfficeIcon, CalendarStarIcon, CertificateIcon, EnvelopeIcon, StudentIcon } from "@phosphor-icons/react/dist/ssr";
import './styles.css';

const MainContent: React.FC = () => (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 relative z-10">
        {/* Summary */}
        <section id="summary" className="mb-16 pt-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="relative flex-shrink-0 image">
                    <img 
                        src={portfolioData.profilePicture} 
                        alt={portfolioData.name} 
                        className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl border-4 border-gray-100 dark:border-gray-800 hover:scale-105 transition-transform duration-300 shadow-lg dissolve-effect"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/128x128/E0E0E0/333333?text=JS' }}
                    />
                </div>
                <div className="text-center md:text-left summary">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">{portfolioData.name}</h1>
                    <h2 className="text-xl md:text-2xl font-semibold text-pink-500 dark:text-pink-400 mb-4">{portfolioData.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl text-justify">{portfolioData.summary}</p>
                </div>
            </div>
        </section>

        {/* Skills */}
        <Section id="skills" title="Skills" icon={<LaptopIcon className="text-pink-500 dark:text-pink-400" />}>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-300">Hard Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.skills.hard.map(skill => (
                                <span key={skill} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-md">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-300">Soft Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.skills.soft.map(skill => (
                                <span key={skill} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-md">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </Section>

        {/* Education */}
        <Section id="education" title="Education" icon={<GraduationCapIcon className="text-pink-500 dark:text-pink-400" />}>
        {
            portfolioData.education.map((edu, index) => (
                <Card key={index} className="mb-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 dark:bg-gray-700/50 p-3 rounded-md">
                            <StudentIcon className="text-pink-500 dark:text-pink-400" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{edu.institution}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{edu.degree}</p>
                            <p className="text-gray-600 dark:text-gray-400 italic">{edu.startYear} - {edu.graduationYear}</p>
                        </div>
                    </div>
                </Card>
            ))
        }
            
        </Section>

        {/* Work Experience */}
        <Section id="experience" title="Work Experience" icon={<BuildingOfficeIcon className="text-pink-500 dark:text-pink-400" />}>
        {
            portfolioData.experience.map((exp, index) => (
                <Card key={index} className="mb-4">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="bg-blue-50 dark:bg-gray-700/50 p-3 rounded-md mt-1">
                            <BuildingIcon className="text-pink-500 dark:text-pink-400" size={24} />
                        </div>
                        <div className="col-span-2 w-full">
                            <div className="flex items-center justify-between gap-4 w-full">
                                <h3 className="font-bold text-gray-900 dark:text-white">{exp.company}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{exp.location}</p>
                            </div>
                            <div className="flex items-center justify-between gap-4 mb-4 w-full">
                                <p className="text-gray-900 dark:text-white italic">{exp.role}</p>
                                <p className="text-gray-600 dark:text-gray-400 italic">{exp.duration}</p>
                            </div>
                        </div>
                    </div>
                    {
                        exp.projectDetails.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-1 text-justify">
                                <CircleIcon className="text-pink-500 dark:text-pink-400 inline-block mr-2" size={10} weight="fill" />{detail}
                            </p>
                        ))
                    }
                </Card>
            ))
        }
        </Section>

        {/* Achievements */}
        <Section id="achievements" title="Certification & Achievements" icon={<TrophyIcon className="text-pink-500 dark:text-pink-400" />}>
            <div className="space-y-4">
                {portfolioData.achievements.map((ach, index) => (
                    <Card key={index}>
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 dark:bg-gray-700/50 p-3 rounded-md">
                                <CertificateIcon className="text-pink-500 dark:text-pink-400" size={20} />
                            </div>
                            <a href={ach.url} target='_blank' className="font-semibold text-gray-900 dark:text-white">{ach.title} - {ach.year}</a>
                            <p className="text-gray-600 dark:text-gray-400">({ach.from})</p>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
        
        {/* Hobbies */}
        <Section id="hobbies" title="Hobbies" icon={<CalendarStarIcon className="text-pink-500 dark:text-pink-400" />}>
            <div className="flex flex-wrap gap-2">
                {portfolioData.hobbies.map(hobby => (
                    <span key={hobby} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-md">{hobby}</span>
                ))}
            </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact" icon={<UserIcon className="text-pink-500 dark:text-pink-400" />}>
            <Card>
                <div className="flex flex-col md:flex-row justify-around items-start md:items-center gap-6">
                    <div className="flex items-center gap-3">
                        <EnvelopeIcon className="text-pink-500 dark:text-pink-400" size={24} />
                        <a href={`mailto:${portfolioData.contact.email}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">{portfolioData.contact.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <PhoneIcon className="text-pink-500 dark:text-pink-400" size={24} />
                        <span className="text-gray-700 dark:text-gray-300">{portfolioData.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <a title='linkedin' href={portfolioData.contact.linkedin} target = '_blank' className="text-gray-700 dark:text-gray-300">
                            <LinkedinLogoIcon className="text-pink-500 dark:text-pink-400" size={24} />
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <a title='github' href={portfolioData.contact.github} target='_blank' className="text-gray-700 dark:text-gray-300">
                            <GithubLogoIcon className="text-pink-500 dark:text-pink-400" size={24} />
                        </a>
                    </div>
                </div>
            </Card>
        </Section>
    </main>
);

export default MainContent;