import React, { useEffect, useState } from 'react'

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'purchases', label: 'Purchases' },
  { id: 'availability', label: 'Availability, Errors & Inaccuracies' },
  { id: 'content', label: 'Content' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'intellectual', label: 'Intellectual Property' },
  { id: 'links', label: 'Links To Other Websites' },
  { id: 'termination', label: 'Termination' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'liability', label: 'Limitation Of Liability' },
  { id: 'disclaimer', label: 'Disclaimer & Non-Waiver' },
  { id: 'exclusions', label: 'Exclusions' },
  { id: 'law', label: 'Governing Law' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact Us' }
]

const TermsAndConditionsPage: React.FC = () => {
  const [showHeader, setShowHeader] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Sticky Header on Scroll */}
      {showHeader && (
        <header className={`bg-header${theme === 'light' ? ' light' : ''} fixed top-0 left-0 w-full z-50  shadow-md  transition-all`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              {/* <img src="/Owl-Night-Owl.svg" alt="Logo" className=" rounded" /> */}
              <span className="font-bold text-[#eb5c1e] text-lg">JeremyTesting</span>
            </div>
            <div className="flex gap-2">
              <a
                href="/login"
                className="px-4 py-1 rounded-full bg-[#eb5c1e]/20 hover:bg-[#eb5c1e]/20 text-[#eb5c1e] font-semibold border border-[#eb5c1e] transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-1 rounded-full bg-[#eb5c1e] hover:bg-[#ff7a42] text-white font-semibold border border-[#eb5c1e] transition"
              >
                Register
              </a>
            </div>
          </div>
        </header>
      )}
      <div className={`login-bg${theme === 'light' ? ' light' : ''}`}>
        <div className="max-w-5xl mx-auto py-8">
          <div className={`login-bg${theme === 'light' ? ' light' : ''} rounded-2xl shadow-2xl border border-blue-100 p-8 md:p-12 backdrop-blur-md relative`}>
            {/* Theme Toggle Button */}
            <button
              type="button"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              onClick={handleThemeToggle}
              className="absolute top-4 right-4 p-2 rounded-full border border-gray-200 bg-white shadow hover:bg-gray-100 transition"
              style={{
                zIndex: 20,
                background: theme === 'light' ? '#f7f7fa' : '#fff'
              }}
            >
              {theme === 'light' ? (
                // Moon icon for dark mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              ) : (
                // Sun icon for light mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              )}
            </button>
            <div className="flex flex-col md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#eb5c1e] mb-2">Terms and Conditions</h1>
                <p className="text-sm text-gray-500">Last updated: September 12, 2018</p>
              </div>
              {/* <nav className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-[#eb5c1e] font-semibold transition"
                  >
                    {s.label}
                  </a>
                ))}
              </nav> */}
            </div>
            <div className={`prose prose-blue max-w-none  login-subtitle${theme === 'light' ? ' light' : ''}`}>
              <section id="intro">
                <h2 className="text-xl font-bold text-[#eb5c1e]">Introduction</h2>
                <p>
                  These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with <a href="https://jeremy.smart.vet" className="font-semibold text-[#eb5c1e]">https://jeremy.smart.vet</a> website (the "Service") operated by <span className="font-semibold text-[#eb5c1e]">JeremyTesting</span> ("us", "we", or "our").
                </p>
                <p>
                  Please read these Terms and Conditions carefully before using the Service.
                </p>
                <p>
                  Your access to and use of the Service is based on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                </p>
                <p>
                  By accessing or using the Service you agree to be bound by these Terms and accept all legal consequences. If you do not agree to these terms and conditions, in whole or in part, please do not use the Service.
                </p>
              </section>
              <section id="purchases">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Purchases</h2>
                <p>
                  If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
                </p>
                <p>
                  You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
                </p>
                <p>
                  By submitting such information, you grant us the right to provide the information to third parties for purposes of facilitating the completion of Purchases.
                </p>
                <p>
                  We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.
                </p>
                <p>
                  We reserve the right to refuse or cancel your order if fraud or an unauthorised or illegal transaction is suspected. We will not be held responsible or liable for any failure for the Purchase to complete, or any resulting loss or damages to you.
                </p>
              </section>
              <section id="availability">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Availability, Errors and Inaccuracies</h2>
                <p>
                  In order to provide exceptional service, and accuracy, we regularly update the products and services on the Service.
                </p>
                <p>
                  We cannot and do not guarantee the accuracy or completeness of any information, including prices, product images, specifications, availability, and services. We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.
                </p>
                <p>
                  Despite our best efforts, the products or services available on our Service may have an error regarding the price, be inaccurately described, or be unavailable.
                </p>
                <p>
                  We may experience delays in updating information on the Service and in our advertising on other websites.
                </p>
              </section>
              <section id="content">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Content</h2>
                <p>
                  Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
                </p>
                <p>
                  By posting Content to the Service, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.
                </p>
                <p>
                  You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
                </p>
                <p>
                  We reserve all rights to block or remove communications or materials that we determine to be: (a) abusive, defamatory, or obscene; (b) fraudulent, deceptive, or misleading; (c) in violation of a copyright, trademark or, other intellectual property right of another or; (d) offensive or otherwise unacceptable to us in our sole discretion.
                </p>
                <p>
                  You acknowledge that, by providing you with the ability to view and distribute user-generated content on the Service, we are merely acting as a passive conduit for such distribution and is not undertaking any obligation or liability relating to any contents or activities on the Service.
                </p>
              </section>
              <section id="accounts">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Accounts</h2>
                <p>
                  When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p>
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
                </p>
                <p>
                  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </section>
              <section id="intellectual">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Intellectual Property</h2>
                <p>
                  The Service and all contents, including but not limited to text, images, graphics or code are the property of JeremyTesting and are protected by copyright, trademarks, database and other intellectual property rights. You may display and copy, download or print portions of the material from the different areas of the Service only for your own non-commercial use, or to place an order with JeremyTesting. Any other use is strictly prohibited and may violate copyright, trademark and other laws. These Terms do not grant you a license to use any trademark of JeremyTesting or its affiliates. You further agree not to use, change or delete any proprietary notices from materials downloaded from the Service.
                </p>
              </section>
              <section id="links">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Links To Other Web Sites</h2>
                <p>
                  The Service may contain links to third-party web sites or services that are not owned or controlled by JeremyTesting.
                </p>
                <p>
                  JeremyTesting has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that JeremyTesting shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such websites or services.
                </p>
                <p>
                  We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
                </p>
              </section>
              <section id="termination">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Termination</h2>
                <p>
                  We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.
                </p>
                <p>
                  All provisions of the Terms shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                </p>
                <p>
                  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
              </section>
              <section id="indemnification">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Indemnification</h2>
                <p>
                  You agree to indemnify, defend and hold harmless JeremyTesting, its principals, officers, directors, representatives, employees, contractors, licensors, licensees, suppliers and agents, from and against any claims, losses, damages, losses, obligations, costs, actions or demands.
                </p>
                <p>
                  These include but are not limited to: (a) legal and accounting fees resulting from your use of the Service; (b) your breach of any of these Terms; (c) anything you post on or upload to the Service; and (d) any activity related to your account. This includes any negligent or illegal conduct by you, any person or entity accessing the Service using your account whether such access is obtained via fraudulent or illegal means.
                </p>
              </section>
              <section id="liability">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Limitation Of Liability</h2>
                <p>
                  JeremyTesting, its directors, employees, partners, agents, suppliers, or affiliates, shall not be liable for any loss or damage, direct or indirect, incidental, special, consequential or punitive damages, including without limitation, economic loss, loss or damage to electronic media or data, goodwill, or other intangible losses, resulting from (i) your access to or use of the Service; (ii) your inability to access or use the Service; (iii) any conduct or content of any third-party on or related to the Service; (iiv) any content obtained from or through the Service; and (v) the unauthorized access to, use of or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other claim in law, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                </p>
              </section>
              <section id="disclaimer">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Disclaimer And Non-Waiver of Rights</h2>
                <p>
                  JeremyTesting makes no guarantees, representations or warranties of any kind as regards the website and associated technology. Any purportedly applicable warranties, terms and conditions are excluded, to the fullest extent permitted by law. Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance, except as provided for under the laws of any province in Canada. In such cases, the provincial law shall apply to the extent necessary.
                </p>
                <p>
                  JeremyTesting its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
                </p>
                <p>
                  If you breach any of these Terms and JeremyTesting chooses not to immediately act, or chooses not to act at all, JeremyTesting will still be entitled to all rights and remedies at any later date, or in any other situation, where you breach these Terms. JeremyTesting does not waive any of its rights. JeremyTesting shall not be responsible for any purported breach of these Terms caused by circumstances beyond its control. A person who is not a party to these Terms shall have no rights of enforcement.
                </p>
                <p>
                  You may not assign, sub-license or otherwise transfer any of your rights under these Terms.
                </p>
              </section>
              <section id="exclusions">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Exclusions</h2>
                <p>
                  As set out, above, some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you. Provincial laws of Canada may apply to certain products and service provided.
                </p>
              </section>
              <section id="law">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Governing Law</h2>
                <p>
                  These Terms shall be governed by, and interpreted and enforced in accordance with, the laws in the Province of Ontario and the laws of Canada, as applicable.
                </p>
                <p>
                  If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction, then any remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements, oral or otherwise, regarding the Service.
                </p>
              </section>
              <section id="changes">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Changes</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will make reasonable efforts to provide at least 15 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, in whole or in part, please stop using the website and the Service.
                </p>
              </section>
              <section id="contact">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us.
                </p>
                <p>
                  By email: <a href="mailto:support@live.clinic" className="text-[#eb5c1e] underline">support@live.clinic</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsAndConditionsPage
