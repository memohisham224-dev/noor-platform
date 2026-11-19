import config from '../client-config.json';

export default function Home() {
  return (
    <div>
      <header style={{background: config.colors.primary, color: 'white', padding: '20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{margin:0}}>{config.name}</h1>
        <a href={`https://wa.me/${config.whatsapp}`} style={{background: config.colors.secondary, color:'white', padding:'12px 24px', borderRadius:'8px', textDecoration:'none', fontWeight:'bold'}}>تواصل واتساب</a>
      </header>

      <div style={{padding:'20px', background:'#f5f5f5', textAlign:'center'}}>
        <h2>{config.seo.title}</h2>
        <p>{config.seo.description}</p>
      </div>

      <main style={{padding:'20px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:'20px'}}>
        {config.products.map((p:any, i:number) => (
          <div key={i} style={{border:'1px solid #ddd', borderRadius:'12px', padding:'20px', background:'white'}}>
            <h3 style={{marginTop:0}}>{p.name}</h3>
            <p style={{color: config.colors.primary, fontWeight:'bold', fontSize:'20px'}}>{p.price} جنيه <span style={{textDecoration:'line-through', color:'#999', fontSize:'14px'}}>{p.oldPrice}</span></p>
            <a href={`https://wa.me/${config.whatsapp}?text=عايز ${p.name}`} style={{display:'block', textAlign:'center', background:config.colors.primary, color:'white', padding:'10px', borderRadius:'8px', textDecoration:'none', marginTop:'10px'}}>احجز الان - واتساب</a>
          </div>
        ))}
      </main>

      <footer style={{background:'#222', color:'white', padding:'20px', textAlign:'center', marginTop:'30px'}}>
        <p>© {config.name} - {config.domain}</p>
        <p>موقع سريع بـ Next.js - يتصدر نتائج جوجل</p>
      </footer>
    </div>
  );
}
