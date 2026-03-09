export default function ImageTextSection({left, right}){
    return(
        <section style={{ padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
                <div style={{ minHeight: '200px' }}>
                    {left ? <div dangerouslySetInnerHTML={{ __html: left }} /> : <p>No image</p>}
                </div>
                <div style={{ lineHeight: '1.6' }}>
                    {right ? <div dangerouslySetInnerHTML={{ __html: right }} /> : <p>No content</p>}
                </div>
            </div>
        </section>
    )
}