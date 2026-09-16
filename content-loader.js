const CONTENT_REPO = 'PEAKLEGACY/peak-legacy-website';
const CONTENT_BRANCH = 'main';
const GH_API = `https://api.github.com/repos/${CONTENT_REPO}/contents`;
const RAW = `https://raw.githubusercontent.com/${CONTENT_REPO}/${CONTENT_BRANCH}`;

function parseFrontmatter(text){
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if(!m) return {meta:{}, body:text.trim()};
  const meta={};
  m[1].split('\n').forEach(line=>{
    const i=line.indexOf(':'); if(i<0) return;
    const key=line.slice(0,i).trim();
    let value=line.slice(i+1).trim();
    value=value.replace(/^['"]|['"]$/g,'');
    meta[key]=value;
  });
  return {meta,body:m[2].trim()};
}

async function githubFiles(folder){
  const res=await fetch(`${GH_API}/${folder}?ref=${CONTENT_BRANCH}`,{headers:{Accept:'application/vnd.github+json'}});
  if(!res.ok) throw new Error('GitHub content unavailable');
  const data=await res.json();
  return data.filter(x=>x.type==='file' && /\.(md|markdown)$/i.test(x.name));
}

async function loadFolder(folder){
  const files=await githubFiles(folder);
  return Promise.all(files.map(async f=>{
    const res=await fetch(`${RAW}/${f.path}`);
    const text=await res.text();
    const parsed=parseFrontmatter(text);
    return {...parsed.meta,body:parsed.body,file:f.name,path:f.path};
  }));
}

function escapeHtml(s=''){
  return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function simpleMarkdown(md=''){
  if(window.marked) return marked.parse(md);
  return md.split(/\n\s*\n/).map(p=>`<p>${escapeHtml(p).replace(/\n/g,'<br>')}</p>`).join('');
}

window.PeakContent={loadFolder,parseFrontmatter,simpleMarkdown,escapeHtml};
