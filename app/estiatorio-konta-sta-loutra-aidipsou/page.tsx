import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Εστιατόριο κοντά στα Λουτρά Αιδηψού | Anemoia Greek Restaurant - (ΡΟΒΙΕΣ ΦΑΓΗΤΟ)',
  description: 'Ανακαλύψτε το καλύτερο εστιατόριο κοντά στα Λουτρά Αιδηψού. Απολαύστε παραδοσιακά ελληνικά πιάτα σε ένα μοναδικό περιβάλλον.',
  alternates: { canonical: '/estiatorio-konta-sta-loutra-aidipsou' },
}

export default function Page() {
  const schemaData = {
  "@context": "https://schema.org",
  "@type": "Εστιατόριο/Ταβέρνα",
  "name": "Anemoia Greek Restaurant - (ΡΟΒΙΕΣ ΦΑΓΗΤΟ)",
  "address": "Evia Island, Ροβιές 340 05, Ελλάδα",
  "telephone": "698 706 1301",
  "url": "https://anemoiaevia.com/",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "reviewCount": 325
  },
  "openingHours": "Mo-Su 08:30-22:30",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ποιες είναι οι ώρες λειτουργίας του εστιατορίου;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Το Anemoia Greek Restaurant λειτουργεί καθημερινά από 8:30 π.μ. έως 10:30 π.μ."
      }
    },
    {
      "@type": "Question",
      "name": "Ποιες είναι οι επιλογές φαγητού που προσφέρετε;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Προσφέρουμε αυθεντικά ελληνικά πιάτα, φρέσκα θαλασσινά, καθώς και γλυκά για επιδόρπιο."
      }
    },
    {
      "@type": "Question",
      "name": "Έχετε υπηρεσία delivery;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ναι, προσφέρουμε υπηρεσία delivery για να απολαμβάνετε τα αγαπημένα σας πιάτα στο σπίτι."
      }
    },
    {
      "@type": "Question",
      "name": "Μπορώ να κάνω κράτηση;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Βεβαίως! Μπορείτε να καλέσετε στο 698 706 1301 για να κάνετε κράτηση."
      }
    },
    {
      "@type": "Question",
      "name": "Ποιες είναι οι επιλογές ποτών;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Στο Anemoia σερβίρουμε μπύρες και κρασιά, ιδανικά για κάθε γεύμα."
      }
    }
  ]
}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a', maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>

        {/* Hero Image */}
        <div style={{ marginBottom: 32, borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9' }}>
          <img src="https://places.googleapis.com/v1/places/ChIJCQbapCTRoBQRQupEZ-h5WXE/photos/AU_ZVEH8wdIU3uo6Dg7yqMTCN4c02VjcCoRO3HsztRSx8S4vvkke2Mzg3kDW9d2YJKAFTX4mxpLe6O4wUEvySTGa8VfaGBvRo9fm9foErU8MwQ61tRRa1rTtmPyjZx5pktQ00NOzJkkNjIzGJEt9kIoq1Bjn8X4c8F5kiXwlyc1miEpjFnkZUEaMFZGj0g6cUVP96OMFDDKI4zP_lKDn7B_c9WPCxHtXnCPK7gq97tEYdhbEdzSA_KO6ahhgVXSYnzbBrLrC4cgLl5fjcVDoJIB9z2bmgWmayXBAnb33oGIoM3mtoslKFlgUrn7LWtMIzXBIj5J76nrppEUH56igtMIoG5TZJteYxWYpwt8NjFTmU2Enf160_gxBb7Chr8H4g-cAdwR4_4ekeQfG6K-tdnxuPYIrvzwzibigPFKS_5qpMv4kOA/media?maxHeightPx=800&maxWidthPx=1200&key=AIzaSyBYFjuk_BWBVO7gDrDteMUxSRMy_9dMVwE" alt="Εστιατόριο κοντά στα Λουτρά Αιδηψού | Anemoia Greek Restaurant - (ΡΟΒΙΕΣ ΦΑΓΗΤΟ)" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Gallery */}
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 32 }}>
          
          <div style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src="https://places.googleapis.com/v1/places/ChIJCQbapCTRoBQRQupEZ-h5WXE/photos/AU_ZVEFFde13tM-rkATuUtQtP2rXy-A8jvPEkqpqdHpQHbaW-RSHzEu4zPyIKKa_zumfk_BhBsMP38nDuFRhXTK_hGsASJZgCAF60vhx3tKvvhgQHwkp5F6mgA-KY71lCmfcaj2rb4T0QcE0lwhRtufi34A7eA2vZx8W_caX0O_q-2yv6M3hjDI9Jdnszxg8iyll8UnFXei6qKKiI3wvodou3bLXU5RVWJ2yJojunKGXzv4IdhN8WCVsF4qhhesjobdJVNfVEKrKKyGub15ePXu_DWHty4QW5odyr3aBmKm1CRGg7g/media?maxHeightPx=800&maxWidthPx=1200&key=AIzaSyBYFjuk_BWBVO7gDrDteMUxSRMy_9dMVwE" alt="εστιατόριο 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src="https://places.googleapis.com/v1/places/ChIJCQbapCTRoBQRQupEZ-h5WXE/photos/AU_ZVEFQLPeyLhOwVgYYPxKcPPDdCOuPi5TEtnl1OuNcrB41EQDIPB_FgPGeU5MZXiMho_t-zvGsTFAKHgCAbg_hvXfS0pNmM7HJLi487FHhYEUMaJzf8V9N0M6R6VbX6aQgr_hS3uENaU14xoG4FsFuJQ2_4FLoSYTdKg5rXHN3hqdksVAQC0ujeEPjOx-rlmUJXZCudCtHbsOpQ9kmXb2zNgXpvp_3CciadMhlcuIgbgc4FObBtOFZbfpvfhKMjQ5BMVQK8wVnSy9WUx-R-HKfMx4YUb887ZT33S9f3uDPPT6CvQ/media?maxHeightPx=800&maxWidthPx=1200&key=AIzaSyBYFjuk_BWBVO7gDrDteMUxSRMy_9dMVwE" alt="εστιατόριο 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src="https://places.googleapis.com/v1/places/ChIJCQbapCTRoBQRQupEZ-h5WXE/photos/AU_ZVEG23gY2TuhxhGLPoKy04FnmM_rlF07egEPvIS6Fl6Pl2Buo1EXNe4kskCV3Yc5aB0yDkyUA2mLwUeBT7Gl8ajVkmUY9KNy1s-44cvjmShzbtbvWVLdsl1zSA05W7u9H1GStI6ATxDdschXdf0Yd_jdAjN1AojdmA17KfoR9RcFZuecU-lgyDNPuNfSgya_E9lkghvk3vOpEE_m-NRztkjV7rpSATr5nrbujANgONJjafMYpGKMelPGL7TEmKdVN2mVPobkQafIlkQMPMYb8evxnRaLJpwd9vytDr3YE6fjIMCUA5o3N2YQRVeV47IFnQ8oCKIo9UHC0EKR0H4IXbuRDVMnLYvKR-w25KcO1vL2aOjwepNRN9CIBHU8r0LDR02ecGEFMsLPzynvWD6Su7lmVWG2ekDMufg1NatLx4dlZQXf5J0Eyydopgy9zWG5r/media?maxHeightPx=800&maxWidthPx=1200&key=AIzaSyBYFjuk_BWBVO7gDrDteMUxSRMy_9dMVwE" alt="εστιατόριο 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: '#94a3b8', marginBottom: 24 }}>
          <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Αρχική</a>
          {' → '}κοντά στα Λουτρά Αιδηψού
          {' → '}εστιατόριο
        </nav>

        {/* H1 */}
        <h1 style={{ fontSize: 'clamp(24px,5vw,42px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.02em' }}>
          Εστιατόριο κοντά στα Λουτρά Αιδηψού | Anemoia Greek Restaurant - (ΡΟΒΙΕΣ ΦΑΓΗΤΟ)
        </h1>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <span style={{ color: '#f59e0b', fontSize: 18 }}>★★★★★</span>
          <span style={{ fontSize: 14, color: '#475569' }}>4.8 (325 κριτικές)</span>
        </div>

        {/* Intro */}
        <p style={{ fontSize: 18, lineHeight: 1.8, color: '#334155', marginBottom: 32 }}>
          Αναζητάτε ένα εστιατόριο κοντά στα Λουτρά Αιδηψού; Το Anemoia Greek Restaurant είναι η ιδανική επιλογή για αυθεντικές γεύσεις και μοναδική ατμόσφαιρα. Με rating 4.8 και 325 κριτικές, προσφέρουμε μια εμπειρία φαγητού που θα σας μείνει αξέχαστη, είτε απολαμβάνετε το γεύμα σας εντός του εστιατορίου είτε έξω με θέα τη θάλασσα.
        </p>

        {/* Sections */}
        
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.01em' }}>
            Γευστικές εμπειρίες στο Anemoia
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#334155' }}>
            Στο Anemoia Greek Restaurant, προσφέρουμε μια ποικιλία πιάτων που αντικατοπτρίζουν την αυθεντική ελληνική κουζίνα. Οι πελάτες μας έχουν εντυπωσιαστεί από την ποιότητα των γευμάτων μας, όπως αναφέρεται σε πολλές κριτικές. Η ατμόσφαιρα είναι ζεστή και φιλόξενη, ιδανική για οικογενειακά γεύματα ή ρομαντικά δείπνα. Μπορείτε να απολαύσετε το φαγητό σας δίπλα στη θάλασσα, με επιλογές όπως φρέσκα θαλασσινά και παραδοσιακά ελληνικά πιάτα. Οι τιμές μας είναι ελαφρώς υψηλότερες από τις συνηθισμένες ταβέρνες της περιοχής, όμως η ποιότητα και η εξυπηρέτηση που προσφέρουμε το αξίζουν. Μην παραλείψετε να δοκιμάσετε τη σπιτική λεμονάδα και τον μπακλαβά με παγωτό, που έχουν κερδίσει πολλές θετικές κριτικές.
          </p>
        </section>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.01em' }}>
            Τοπική ατμόσφαιρα και αξιοθέατα
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#334155' }}>
            Η τοποθεσία του Anemoia είναι ιδανική, καθώς βρίσκεται κοντά στα Λουτρά Αιδηψού, έναν δημοφιλή τουριστικό προορισμό. Μπορείτε να απολαύσετε τη μαγευτική θέα της θάλασσας και να κάνετε μια βόλτα στην παραλία μετά το γεύμα σας. Η περιοχή προσφέρει πολλές δραστηριότητες και αξιοθέατα, όπως οι ιαματικές πηγές και οι κοντινές παραλίες. Είμαστε μόλις 10 λεπτά με το αυτοκίνητο από τα Λουτρά Αιδηψού, γεγονός που καθιστά το εστιατόριό μας ιδανικό σημείο για μια στάση μετά την εξερεύνησή σας.
          </p>
        </section>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.01em' }}>
            Γιατί να επιλέξετε το Anemoia
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#334155' }}>
            Η επιλογή του Anemoia σημαίνει ότι επιλέγετε ποιότητα και εξαιρετική εξυπηρέτηση. Με rating 4.8 από 325 κριτικές, οι πελάτες μας εκτιμούν την υποδειγματική εξυπηρέτηση και την προσοχή στη λεπτομέρεια. Τόσο οι κριτικές όσο και οι προσωπικές μαρτυρίες επιβεβαιώνουν ότι το εστιατόριό μας προσφέρει μια μοναδική εμπειρία που συνδυάζει γεύσεις και ατμόσφαιρα. Επιπλέον, προσφέρουμε και υπηρεσίες delivery, ώστε να μπορείτε να απολαύσετε τα αγαπημένα σας πιάτα και στο σπίτι.
          </p>
        </section>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.01em' }}>
            Κλείστε το τραπέζι σας σήμερα
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#334155' }}>
            Μην χάνετε χρόνο! Επικοινωνήστε μαζί μας στο 698 706 1301 και κλείστε το τραπέζι σας. Ελάτε να απολαύσετε μια αξέχαστη γαστρονομική εμπειρία στο Anemoia Greek Restaurant!
          </p>
        </section>

        {/* FAQ */}
        
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 700, marginBottom: 24 }}>Συχνές Ερωτήσεις</h2>
          
          <div style={{ marginBottom: 16, padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Ποιες είναι οι ώρες λειτουργίας του εστιατορίου;</h3>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: 0 }}>Το Anemoia Greek Restaurant λειτουργεί καθημερινά από 8:30 π.μ. έως 10:30 π.μ.</p>
          </div>
          <div style={{ marginBottom: 16, padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Ποιες είναι οι επιλογές φαγητού που προσφέρετε;</h3>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: 0 }}>Προσφέρουμε αυθεντικά ελληνικά πιάτα, φρέσκα θαλασσινά, καθώς και γλυκά για επιδόρπιο.</p>
          </div>
          <div style={{ marginBottom: 16, padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Έχετε υπηρεσία delivery;</h3>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: 0 }}>Ναι, προσφέρουμε υπηρεσία delivery για να απολαμβάνετε τα αγαπημένα σας πιάτα στο σπίτι.</p>
          </div>
          <div style={{ marginBottom: 16, padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Μπορώ να κάνω κράτηση;</h3>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: 0 }}>Βεβαίως! Μπορείτε να καλέσετε στο 698 706 1301 για να κάνετε κράτηση.</p>
          </div>
          <div style={{ marginBottom: 16, padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Ποιες είναι οι επιλογές ποτών;</h3>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: 0 }}>Στο Anemoia σερβίρουμε μπύρες και κρασιά, ιδανικά για κάθε γεύμα.</p>
          </div>
        </section>

        {/* Reviews */}
        

        {/* E-E-A-T */}
        
        <section style={{ marginBottom: 40, padding: 24, background: '#f0fdf4', borderRadius: 16, border: '1px solid #bbf7d0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#166534', marginBottom: 12 }}>Για εμάς</h2>
          <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, margin: 0 }}>Το Anemoia Greek Restaurant διαθέτει χρόνια εμπειρίας και προσφέρει αυθεντική ελληνική κουζίνα με φρέσκα υλικά. Η φιλόξενη ατμόσφαιρα και η εξαιρετική εξυπηρέτηση είναι αυτά που μας ξεχωρίζουν.</p>
          
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
            <span style={{ padding: '4px 12px', background: '#dcfce7', borderRadius: 20, fontSize: 12, color: '#166534' }}>✓ 4.8 stars από 325 κριτικές στο Google</span><span style={{ padding: '4px 12px', background: '#dcfce7', borderRadius: 20, fontSize: 12, color: '#166534' }}>✓ Εξαιρετική εξυπηρέτηση και ποιότητα φαγητού σύμφωνα με τις κριτικές</span><span style={{ padding: '4px 12px', background: '#dcfce7', borderRadius: 20, fontSize: 12, color: '#166534' }}>✓ Προσφέρουμε dine-in, delivery και outdoor seating</span>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#1e40af', borderRadius: 20, padding: 'clamp(24px,5vw,48px)', textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(20px,4vw,32px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Κάντε Κράτηση Τώρα
          </h2>
          <a href="tel:698 706 1301" style={{ display: 'inline-block', fontSize: 'clamp(20px,4vw,32px)', fontWeight: 800, color: '#fbbf24', textDecoration: 'none', marginBottom: 12 }}>
            📞 698 706 1301
          </a>
          <p style={{ fontSize: 14, color: '#bfdbfe', margin: 0 }}>Δευτέρα: 8:30 - 10:30 π.μ., Τρίτη: 8:30 - 10:30 π.μ., Τετάρτη: 8:30 - 10:30 π.μ., Πέμπτη: 8:30 - 10:30 π.μ., Παρασκευή: 8:30 - 10:30 π.μ., Σάββατο: 8:30 - 10:30 π.μ., Κυριακή: 8:30 - 10:30 π.μ.</p>
        </section>

        {/* Internal Links */}
        
        <nav style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#475569' }}>Δείτε επίσης</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            
            <a href="//menu" style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: 8, fontSize: 14, color: '#1e40af', textDecoration: 'none', fontWeight: 500 }}>
              Δείτε το μενού μας
            </a>
            <a href="//contact" style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: 8, fontSize: 14, color: '#1e40af', textDecoration: 'none', fontWeight: 500 }}>
              Επικοινωνήστε μαζί μας
            </a>
          </div>
        </nav>

      </main>
    </>
  )
}