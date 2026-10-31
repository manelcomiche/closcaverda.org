import { faq } from "@/data/faq"

// Native <details> keeps every answer in the HTML, so search engines and screen readers get it without JS.
export default function FaqList() {
  return (
    <div className="faq divide-y divide-posidonia/15 border-y border-posidonia/15">
      {faq.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg sm:text-xl font-semibold">
            <h3>{item.question}</h3>
          </summary>
          <p className="pb-6 -mt-1 max-w-prose text-pedra">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
