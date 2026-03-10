import { VCRow } from '../../../../../components/VCComponents';
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import HeroSection from "../../../../../components/HeroSection";
const rows = [
  {
    tag: 'vc_row',
    fullWidth: false,
    columns: [
      {
        tag: 'vc_column',
        width: '1/4',
        offset: '',
        elClass: '',
        content: [
          {
            type: 'sidebar',
            content: ''
          }
        ]
      },
      {
        tag: 'vc_column',
        width: '1/2',
        offset: '',
        elClass: '',
        content: [
          {
            type: 'vc_single_image',
            imageId: 'whitepaper-image',
            alignment: 'center'
          },
          {
            type: 'vc_column_text',
            elClass: '',
            content: '<h3 style="margin-top: 20px; margin-bottom: 15px;">Abstract</h3><p>Projects are started without proper planning and no focus on QA/testing. The project goes on and on with ever increasing budget and timelines while management and users become increasingly unhappy. While the methodologies of testing have evolved considerably over the years, the science of QA in data integration project has not. In this article we\'ll focus on some of the key challenges with data warehouse testing, data migration testing and ETL testing.</p>'
          }
        ]
      },
      {
        tag: 'vc_column',
        width: '1/4',
        offset: '',
        elClass: 'form-wrapper sticky-sidebar',
        content: [
          {
            type: 'vc_column_text',
            elClass: 'form-section',
            content: '<h3 style="margin-bottom: 15px;">Download Now</h3>[gravityform id="1" title="false" description="false"]'
          }
        ]
      }
    ]
  }
];

export default function Page() {
  const images = {
    'whitepaper-image': 'https://abyssgroupindia.com/wp-content/uploads/2026/03/QA-Challenges-in-Data-Integration-Projects-iceDQ-1200px.png'
  };

  return (
    <>
     <Header />
     <HeroSection />
      <div className="whitepaper-page">
        {rows.map((row, index) => (
          <VCRow key={index} row={row} images={images} />
        ))}
      </div>
      <Footer />
    </>
    
  );
}