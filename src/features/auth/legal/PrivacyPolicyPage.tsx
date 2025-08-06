import React, { useEffect, useState } from 'react'

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'info', label: 'Information Collection And Use' },
  { id: 'types', label: 'Types of Data Collected' },
  { id: 'personal', label: 'Personal Data' },
  { id: 'usage', label: 'Usage Data' },
  { id: 'cookies', label: 'Tracking & Cookies Data' },
  { id: 'use', label: 'Use of Data' },
  { id: 'transfer', label: 'Transfer Of Data' },
  { id: 'disclosure', label: 'Disclosure Of Data' },
  { id: 'security', label: 'Security Of Data' },
  { id: 'providers', label: 'Service Providers' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'links', label: 'Links To Other Sites' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'changes', label: 'Changes To This Privacy Policy' },
  { id: 'contact', label: 'Contact Us' }
]

const PrivacyPolicyPage: React.FC = () => {
  const [showHeader, setShowHeader] = useState(false)

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
        <header className="bg-header fixed top-0 left-0 w-full z-50 shadow-md transition-all">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              {/* <img src="/favicon.svg" alt="Logo" className="h-8 w-8 rounded" /> */}
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
      <div className="login-bg">
        <div className="max-w-5xl mx-auto py-8">
          <div className="login-bg rounded-2xl shadow-2xl border border-blue-100 p-8 md:p-12 backdrop-blur-md relative">
            <div className="flex flex-col md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#eb5c1e] mb-2">Privacy Policy</h1>
                <p className="text-sm text-gray-500">Effective date: September 12, 2018</p>
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
            <div className="prose prose-blue max-w-none login-subtitle">
              <section id="intro">
                <h2 className="text-xl font-bold text-[#eb5c1e] dark:text-red-600">Introduction</h2>
                <p>
                  JeremyTesting ("us", "we", or "our") operates the <a href="https://jeremy.smart.vet" className="font-semibold text-[#eb5c1e]">https://jeremy.smart.vet</a> website (the "Service").
                </p>
                <p>
                  This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>
                <p>
                  We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from <a href="https://jeremy.smart.vet" className="font-semibold text-[#eb5c1e]">https://jeremy.smart.vet</a>
                </p>
              </section>
              <section id="info">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Information Collection And Use</h2>
                <p>
                  We collect several different types of information for various purposes to provide and improve our Service to you.
                </p>
              </section>
              <section id="types">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Types of Data Collected</h2>
              </section>
              <section id="personal">
                <h3 className="text-lg font-semibold text-[#eb5c1e] mt-4">Personal Data</h3>
                <p>
                  While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
                </p>
                <ul>
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </section>
              <section id="usage">
                <h3 className="text-lg font-semibold text-[#eb5c1e] mt-4">Usage Data</h3>
                <p>
                  We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
              </section>
              <section id="cookies">
                <h3 className="text-lg font-semibold text-[#eb5c1e] mt-4">Tracking & Cookies Data</h3>
                <p>
                  We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                </p>
                <p>
                  Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                </p>
                <p>Examples of Cookies we use:</p>
                <ul>
                  <li><b>Session Cookies.</b> We use Session Cookies to operate our Service.</li>
                  <li><b>Preference Cookies.</b> We use Preference Cookies to remember your preferences and various settings.</li>
                  <li><b>Security Cookies.</b> We use Security Cookies for security purposes.</li>
                </ul>
              </section>
              <section id="use">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Use of Data</h2>
                <p>JeremyTesting uses the collected data for various purposes:</p>
                <ul>
                  <li>To provide and maintain the Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                  <li>To provide customer care and support</li>
                  <li>To provide analysis or valuable information so that we can improve the Service</li>
                  <li>To monitor the usage of the Service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>
              <section id="transfer">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Transfer Of Data</h2>
                <p>
                  Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
                </p>
                <p>
                  If you are located outside Canada and choose to provide information to us, please note that we transfer the data, including Personal Data, to Canada and process it there.
                </p>
                <p>
                  Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                </p>
                <p>
                  JeremyTesting will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
                </p>
              </section>
              <section id="disclosure">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Disclosure Of Data</h2>
                <h3 className="text-lg font-semibold text-[#eb5c1e] mt-4">Legal Requirements</h3>
                <p>
                  JeremyTesting may disclose your Personal Data in the good faith belief that such action is necessary to:
                </p>
                <ul>
                  <li>To comply with a legal obligation</li>
                  <li>To protect and defend the rights or property of JeremyTesting</li>
                  <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                  <li>To protect the personal safety of users of the Service or the public</li>
                  <li>To protect against legal liability</li>
                </ul>
              </section>
              <section id="security">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Security Of Data</h2>
                <p>
                  The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </section>
              <section id="providers">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Service Providers</h2>
                <p>
                  We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
                </p>
                <p>
                  These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </section>
              <section id="analytics">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Analytics</h2>
                <p>
                  We may use third-party Service Providers to monitor and analyze the use of our Service.
                </p>
                <h3 className="text-lg font-semibold text-[#eb5c1e] mt-4">Google Analytics</h3>
                <p>
                  Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
                </p>
                <p>
                  You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.
                </p>
                <p>
                  For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: <a href="https://policies.google.com/privacy?hl=en" className="text-[#eb5c1e] underline">https://policies.google.com/privacy?hl=en</a>
                </p>
              </section>
              <section id="links">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Links To Other Sites</h2>
                <p>
                  Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                </p>
                <p>
                  We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                </p>
                <div className="mt-2">
                  <a
                    href="/terms"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eb5c1e] hover:bg-[#eb5c1e]/80 text-white font-semibold border border-purple-200 transition"
                  >
                    {/* Example SVG icon (Arrow Right) */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    Go to Terms &amp; Conditions
                  </a>
                </div>
              </section>
              <section id="children">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Children's Privacy</h2>
                <p>
                  Our Service does not address anyone under the age of 18 ("Children").
                </p>
                <p>
                  We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
                </p>
              </section>
              <section id="changes">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Changes To This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
                <p>
                  We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>
              <section id="contact">
                <h2 className="text-xl font-bold text-[#eb5c1e] mt-8">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicyPage
