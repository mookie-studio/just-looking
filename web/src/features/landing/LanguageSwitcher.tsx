import type { LandingCopy, LandingLanguage } from './landing-copy'

const options: { language: LandingLanguage; label: string; nameKey: 'english' | 'spanish' }[] = [
  { language: 'en', label: 'EN', nameKey: 'english' },
  { language: 'es', label: 'ES', nameKey: 'spanish' },
]

/** The EN/ES switcher in the landing nav. The current language is the pressed button. */
export function LanguageSwitcher({
  language,
  copy,
  onChange,
}: {
  language: LandingLanguage
  copy: LandingCopy
  onChange: (language: LandingLanguage) => void
}) {
  return (
    <div role="group" aria-label={copy.nav.languageGroup} className="flex items-center gap-1">
      {options.map((option) => {
        const pressed = option.language === language
        return (
          <button
            key={option.language}
            type="button"
            lang={option.language}
            aria-label={copy.nav[option.nameKey]}
            aria-pressed={pressed}
            onClick={() => onChange(option.language)}
            className={
              'rounded-s px-2 py-1 text-sm font-semibold text-landing-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight-400 ' +
              (pressed ? 'bg-landing-ink/15' : 'opacity-70 hover:opacity-100')
            }
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
