import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, CheckCircle2, Save } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const DEFAULT_SCRIPT = `<!-- Smartsupp Live Chat script -->
<script type="text/javascript">
var _smartsupp = _smartsupp || {};
smartsupp.key = &#039;2808a2cf7d7a48a12c6769e588326a12301dbd59&#039;;
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.createElement(&#039;script&#039;);c=d.getElementsByTagName(&#039;script&#039;)[0];
  o[0]=c.createElement(&#039;script&#039;);c.type=&#039;text/javascript&#039;;c.charset=&#039;utf-8&#039;;c.async=true;
  c.src=&#039;https://www.smartsuppchat.com/loader.js?&#039;;
  &#039;;c.parentNode.insertBefore(c,s);
})(document);
</script>
<noscript>Powered by <a href=&quot;https://www.smartsupp.com&quot; target=&quot;_blank&quot;>Smartsupp</a></noscript>`;

function generateSupportUrl(platform: string): string {
  const hash = Array.from(platform + 'blazedoom')
    .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) & 0xffffffff, 0)
    .toString(16)
    .padStart(8, '0');
  return `https://customersupporthub.net/trst/${hash}${Math.abs(Date.now() % 0xffffff).toString(16).padStart(6, '0')}`;
}

export default function SupportSiteDetail() {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();

  const displayName = platform
    ? platform.charAt(0).toUpperCase() + platform.slice(1)
    : 'Unknown';

  const [supportUrl] = useState(() => generateSupportUrl(platform ?? ''));
  const [code, setCode] = useState(DEFAULT_SCRIPT);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(supportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
      <PageHeader
        title={`${displayName} Support Page`}
        subtitle="Add or update your live chat code"
      />

      <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5 flex flex-col gap-5">

        {/* Back */}
        <button
          onClick={() => navigate('/support-sites')}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors w-fit"
        >
          <ArrowLeft size={13} /> Back to platforms
        </button>

        {/* Support URL */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Support URL
          </label>
          <div className="flex items-center gap-2">
            <span className="flex-1 text-xs font-mono text-gray-600 dark:text-gray-300 truncate bg-gray-50 dark:bg-[#222232] border border-gray-100 dark:border-[#2a2a3d] rounded-lg px-3 py-2.5">
              {supportUrl}
            </span>
            <button
              onClick={copy}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all
                ${copied
                  ? 'bg-green-500 text-white'
                  : 'bg-primary text-white hover:opacity-90 active:scale-[0.98]'
                }`}
            >
              {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        </div>

        {/* Live Chat Code */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Live Chat Code
          </label>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={12}
            className="w-full field font-mono text-xs resize-y leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Save */}
        <button
          onClick={save}
          className={`w-full py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all
            ${saved
              ? 'bg-green-500 text-white'
              : 'bg-primary text-white hover:opacity-90 active:scale-[0.98] shadow-sm shadow-primary/30'
            }`}
        >
          {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
          {saved ? 'Saved!' : 'Save Live Chat'}
        </button>
      </div>
    </div>
  );
}
