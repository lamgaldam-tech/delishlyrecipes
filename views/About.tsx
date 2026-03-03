export const About = () => (
  <main className="min-h-screen">
    <section className="bg-secondary/50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          About Delishly Recipes
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          We believe great food brings people together.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="prose prose-lg mx-auto space-y-6">
        <p className="text-foreground/80 leading-relaxed">
          Delishly Recipes was born from a simple idea: everyone deserves access
          to tested, reliable, and beautiful recipes that actually work. We're a
          community of passionate home cooks and professional chefs sharing
          recipes we love.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Every recipe on our platform is carefully tested and photographed. We
          focus on clear instructions, honest prep times, and accessible
          ingredients you can find at your local grocery store.
        </p>
        <div className="grid grid-cols-3 gap-6 py-8">
          {[
            { num: "500+", label: "Recipes" },
            { num: "50K+", label: "Monthly Readers" },
            { num: "4.8", label: "Avg Rating" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-primary">
                {s.num}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-foreground/80 leading-relaxed">
          Whether you're looking for a quick weeknight dinner, an impressive
          dessert for a party, or healthy meal prep ideas, we've got you
          covered. Welcome to Delishly Recipes — your kitchen's new best friend.
        </p>
      </div>
    </section>
  </main>
);
