
const dialog=document.getElementById('result-dialog');
function showResult(title,content,note){document.getElementById('dialog-title').textContent=title;document.getElementById('dialog-content').textContent=content;document.getElementById('dialog-note').textContent=note;dialog.showModal()}
document.querySelectorAll('.close,.close-dialog').forEach(b=>b.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.getElementById('year').textContent=new Date().getFullYear();
const productForm=document.getElementById('product-form');
if(productForm){const price=document.getElementById('price');function total(){return Number(productForm.dataset.base)+Array.from(productForm.querySelectorAll('select')).reduce((sum,s)=>sum+Number(s.selectedOptions[0].dataset.extra||0),0)}function updatePrice(){price.textContent='$'+total()}productForm.addEventListener('change',updatePrice);updatePrice();productForm.addEventListener('submit',e=>{e.preventDefault();const lines=Array.from(new FormData(productForm),([k,v])=>k+'：'+(String(v).trim()||'无'));lines.push('示例总价：USD $'+total()+'（未含运费）');showResult(productForm.dataset.title,lines.join('\n'),'这是定制预览，没有创建订单或产生费用。')})}
const tarotForm=document.getElementById('tarot-form');
if(tarotForm){const date=document.getElementById('booking-date');const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const get=t=>parts.find(p=>p.type===t).value;date.min=get('year')+'-'+get('month')+'-'+get('day');tarotForm.addEventListener('submit',e=>{e.preventDefault();const lines=Array.from(new FormData(tarotForm),([k,v])=>k+'：'+v);lines.push('时区：北京时间 UTC+8');showResult('Tarot 预约预览',lines.join('\n'),'此信息尚未发送，也未保留预约时段。')})}
document.querySelectorAll('[data-social]').forEach(b=>b.addEventListener('click',()=>showResult(b.dataset.social,b.dataset.social==='微信'?'微信号与二维码待工作室补充。':b.dataset.social+' 主页链接待工作室补充。','补充联系方式后，此入口将连接工作室的真实账号。')));

const fragranceForm=document.getElementById('fragrance-form');
if(fragranceForm){fragranceForm.addEventListener('submit',e=>{e.preventDefault();const lines=Array.from(new FormData(fragranceForm),([k,v])=>k+'：'+(String(v).trim()||'未填写'));showResult('我的香氛偏好',lines.join('\n'),'这是一份本地预览，尚未发送给工作室，也未创建订单。产品形式与报价需进一步确认。')})}
