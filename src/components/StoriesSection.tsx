import React from 'react';
import { Quote } from 'lucide-react';
import { FAMILY_TESTIMONIALS } from '../data/content';

export const StoriesSection: React.FC = () => {
  return (
    <section id="stories" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#B85E27] bg-[#FDF2E9] px-3.5 py-1.5 rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#1E2E3B] leading-tight">
            Words From the Families We Walk Beside
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5B68]">
            Every small breakthrough at home, at school, or on the playground is a
            milestone worth celebrating together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7 lg:gap-10 max-w-5xl mx-auto">
          {FAMILY_TESTIMONIALS.map((story) => (
            <figure
              key={story.id}
              className="relative bg-[#FAF8F5] rounded-[2rem] p-8 sm:p-10 border border-[#EAE4DB] shadow-[0_10px_30px_rgba(30,46,59,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#FDF2E9] text-[#E68A4F] flex items-center justify-center">
                    <Quote className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#236358] bg-[#EDF6F3] px-3 py-1 rounded-full">
                    {story.focusTag}
                  </span>
                </div>

                <blockquote className="font-display text-xl sm:text-2xl font-medium text-[#1E2E3B] leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-8 pt-6 border-t border-[#E8E2D9] flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-[#2E7D6F] text-white font-display font-semibold text-base flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  {story.initials}
                </div>
                <div>
                  <div className="font-bold text-[#1E2E3B] text-base">
                    {story.author}
                  </div>
                  <div className="text-sm text-[#566775]">{story.relation}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
