const Section: React.FC<{ id: string; title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ id, title, icon, children }) => (
    <section id={id} className="mb-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-gray-200">
        {icon}
        {title}
      </h2>
      {children}
    </section>
);

export default Section;