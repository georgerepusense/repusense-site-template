import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ταβέρνα Ροβιές Εύβοια | Anemoia Greek Restaurant - (ΡΟΒΙΕΣ ΦΑΓΗΤΟ)',
  description: 'ταβέρνα Ροβιές Εύβοια — Anemoia Greek Restaurant - (ΡΟΒΙΕΣ ΦΑΓΗΤΟ). Εστιατόριο/Ταβέρνα στην Ροβιές, Εύβοια.',
  alternates: { canonical: '/taverna-rovies-evia' },
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
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Maria D! ;p"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5
      },
      "reviewBody": "Είναι μια ωραία ταβέρνα, με όμορφη ατμόσφαιρα και φοβερό φαγητό! Ότι δοκιμάσαμε ήταν πολύ νόστιμο και περιποιημένο! Ήταν πολύ προσεγμένο για ταβέρνα! Λίγο τσιμπημένες οι τιμές όμως το φαγητό νόστιμο με ικανοποιητικές μερίδες! Είναι δίπλα στη θάλασσα και έχει και ξαπλώστρες μπροστά! Είχε ωραία σπιτική λεμονάδα και ωραιότατο μπακλαβά με παγωτό!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "ΑΣΗΜΙΝΑ ΚΙΤΣΟΥ"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5
      },
      "reviewBody": "Κάτι διαφορετικό στις Ροβιές.Αν θέλετε να ξεφύγετε από τις κλασικές ταβέρνες, υπέροχο φαγητό πάνω στην θάλασσα."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Anastasios Stavropoulos"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5
      },
      "reviewBody": "Πολύ ωραίο εστιατόριο,με πολύ καλή εξυπηρέτηση, ποιοτικό φαγητό, γλυκό κ ατμόσφαιρα τοπ επιπέδου είτε είναι πρωί, είτε μεσημέρι είτε βράδυ.. Ότι δοκιμάσαμε,από φαγητό μέχρι γλυκό, γρανίτες κτλ ήταν υπέροχο.. Λίγο πιο ακριβό από τις συνηθισμένες ταβέρνες της περιοχής αλλά η θέα που σου προσφέρει κ η ποιότητα των γευμάτων δεν είναι οι συνηθισμένες της περιοχής, οπότε χαλάλι. Σωστός ο όρος που διάβασα κάπου,beach bar restaurant,είναι ο ορισμός.. Μπράβο σε όλο το team!"
    }
  ],
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ποιες είναι οι ώρες λειτουργίας της ταβέρνας;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Η ταβέρνα Anemoia είναι ανοιχτή καθημερινά από 8:30 π.μ. έως 10:30 π.μ."
      }
    },
    {
      "@type": "Question",
      "name": "Προσφέρετε υπηρεσία delivery;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ναι, προσφέρουμε υπηρεσία delivery για την ευκολία σας."
      }
    },
    {
      "@type": "Question",
      "name": "Ποιες είναι οι επιλογές στο μενού;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Το μενού μας περιλαμβάνει μια ποικιλία από ελληνικά πιάτα, θαλασσινά και γλυκά."
      }
    },
    {
      "@type": "Question",
      "name": "Είναι δυνατόν να κάνω κράτηση;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Φυσικά, μπορείτε να κάνετε κράτηση μέσω του τηλεφώνου μας ή της ιστοσελίδας μας."
      }
    },
    {
      "@type": "Question",
      "name": "Έχετε εξωτερικές θέσεις;",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ναι, προσφέρουμε εξωτερικές θέσεις με θέα στη θάλασσα."
      }
    }
  ]
}

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}/>

      <main style={{ fontFamily: "'Montserrat', sans-serif", color: '#1a1a1a', background: '#f5f0e8' }}>

        {/* Hero */}
        <div style={{ position: 'relative', background: '#1a2332', minHeight: 400, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
          <img src="https://places.googleapis.com/v1/places/ChIJCQbapCTRoBQRQupEZ-h5WXE/photos/Ab43m-vXEvSCWjOmkEv4unlCc86GTqMk6EXxHCevB-AOojMsRsMLbS2r0G-m6VQ3r3K7V1vnkExes8DVHUZLU193cUYMoRyfjLd_GUV5gZV0P1H9K5PykUUSDXIZNift_8Niy7LmLuG8AiigQ0wXUspFkOMXlYPUHhsHu021KEx-nSPdJDNabRDaZzL022CanQK4pz0edi9eN9eq9BQ_eYgn7iKobFmEUn6MmI5KxH4JJy62me97SYXDzQFqBZ11z6CWZ21eIRj0aZCjSr0_aOfG25vX3tZvaOipnS3sFfGnFoyzsA/media?maxHeightPx=800&maxWidthPx=1200&key=AIzaSyBYFjuk_BWBVO7gDrDteMUxSRMy_9dMVwE" alt="Ταβέρνα Ροβιές Εύβοια - Anemoia Greek Restaurant" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}/>
          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px,5vw,56px)', width: '100%' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 12 }}>
              Ροβιές, Εύβοια · ταβέρνα Ροβιές Εύβοια
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.01em' }}>
              Ταβέρνα Ροβιές Εύβοια - Anemoia Greek Restaurant
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#c9a96e', fontSize: 18, letterSpacing: 3 }}>★★★★★</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>4.8 · 325 κριτικές Google</span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        

        {/* Breadcrumb */}
        <div style={{ padding: '14px 40px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: '#999', letterSpacing: '0.05em' }}>
            <a href="/" style={{ color: '#999', textDecoration: 'none' }}>Αρχική</a> → Ροβιές, Εύβοια → ταβέρνα Ροβιές Εύβοια
          </span>
        </div>

        {/* Intro */}
        
        <div style={{ padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px)', background: '#fff', maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(17px,2vw,22px)', color: '#2c2c2c', lineHeight: 1.85, fontWeight: 300 }}>
            Καλωσορίσατε στην πιο όμρφη ταβέρνα στις Ροβιές Ευβοίας, το Anemoia Greek Restaurant! Εδώ, θα απολαύσετε μοναδικές γεύσεις της ελληνικής κουζίνας, σε ένα ειδυλλιακό περιβάλλον δίπλα στη θάλασσα. Η εξαιρετική μας ποιότητα φαγητού και η ζεστή εξυπηρέτηση θα σας κάνουν να επιστρέψετε ξανά και ξανά.
          </p>
        </div>

        {/* Sections */}
        
        <div style={{ padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px)', background: '#f5f0e8', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10 }}>
              01
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#1a2332', marginBottom: 20, lineHeight: 1.25 }}>
              Γευστικές Εμπειρίες στην Ταβέρνα Ροβιές Εύβοια
            </h2>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,1.5vw,19px)', color: '#4a4a4a', lineHeight: 1.9, fontWeight: 300 }}>
              Στο εστιατόριο Anemoia Greek Restaurant (γνωστή ταβέρνα στις Ροβιές Ευβοίας), προσφέρουμε μια πλούσια γκάμα από παραδοσιακά ελληνικά πιάτα, φτιαγμένα με αγάπη και προσοχή. Οι επισκέπτες μας έχουν επαινέσει τη νοστιμιά των πιάτων μας, όπως οι χειροποίτες μακαρούνες με μοσχαρίσια κεφτεδάκια και ο μπακλαβάς με παγωτό, που έχουν λάβει άριστες κριτικές. Το μενού μας περιλαμβάνει επιλογές που ικανοποιούν κάθε γούστο, από φρέσκα θαλασσινά μέχρι ντόπια κρέατα και ψάρια ημέρας. Η εμπειρία μας δεν περιορίζεται μόνο στο φαγητό, καθώς η εξυπηρέτησή μας είναι κορυφαία, με το προσωπικό μας να είναι πάντα πρόθυμο να σας εξυπηρετήσει. Επίσης, προσφέρουμε δυνατότητες dine-in, delivery και reservable, ώστε να μπορείτε να απολαύσετε την εμπειρία μας όπως σας βολεύει.
            </p>
          </div>
        </div>
        <div style={{ padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px)', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10 }}>
              02
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#1a2332', marginBottom: 20, lineHeight: 1.25 }}>
              Ανακαλύψτε τις Ροβιές, Εύβοια
            </h2>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,1.5vw,19px)', color: '#4a4a4a', lineHeight: 1.9, fontWeight: 300 }}>
              Οι Ροβιές, μια πανέμορφη παραθαλάσσια περιοχή στην Εύβοια, είναι ιδανικός προορισμός για επισκέπτες που επιθυμούν να συνδυάσουν την γαστρονομία με τη φυσική ομορφιά. Μόλις 1 ώρα και 20 λεπτά από την Χαλκίδα, οι Ροβιές προσφέρουν εκπληκτικές παραλίες και δραστηριότητες για όλους. Αξιοθέατα όπως το αρχαίο θέατρο της Χαλκίδας και ο Ενετικός Πύργος των Ροβιών θα σας εντυπωσιάσουν, κάνοντάς τις την τέλεια επιλογή για μια ημερήσια εκδρομή ή ένα Σαββατοκύριακο.
            </p>
          </div>
        </div>
        <div style={{ padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px)', background: '#f5f0e8', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10 }}>
              03
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#1a2332', marginBottom: 20, lineHeight: 1.25 }}>
              Γιατί να επιλέξετε την Anemoia
            </h2>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,1.5vw,19px)', color: '#4a4a4a', lineHeight: 1.9, fontWeight: 300 }}>
              Το Anemoia Greek Restaurant είναι η πρώτη επιλογή για τους επισκέπτες των Ροβιών, καθώς έχουμε κερδίσει την εμπιστοσύνη τους με 4.8 αστέρια από 325 κριτικές στο Google. Οι πελάτες μας εκτιμούν την ποιότητα του φαγητού μας, την όμορφη ατμόσφαιρα και την εξαιρετική εξυπηρέτηση. Είμαστε περήφανοι για την αναγνώριση που έχουμε λάβει και συνεχίζουμε να προσφέρουμε την καλύτερη εμπειρία στους επισκέπτες μας, είτε είναι πρωί, είτε μεσημέρι, είτε βράδυ.
            </p>
          </div>
        </div>
        <div style={{ padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px)', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10 }}>
              04
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#1a2332', marginBottom: 20, lineHeight: 1.25 }}>
              Κλείστε το Τραπέζι σας Τώρα
            </h2>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,1.5vw,19px)', color: '#4a4a4a', lineHeight: 1.9, fontWeight: 300 }}>
              Μην χάσετε την ευκαιρία να απολαύσετε μοναδικές γεύσεις στην  δημιουργική ταβέρνα μας στις Ροβιές Ευβοίας! Καλέστε μας στο 698 706 1301 για να κλείσετε το τραπέζι σας ή επισκεφθείτε το website μας για περισσότερες πληροφορίες.
            </p>
          </div>
        </div>

        {/* FAQ */}
        
        <div style={{ padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px)', background: '#1a2332' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10 }}>FAQ</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: 36, fontWeight: 400 }}>Συχνές Ερωτήσεις</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 20 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#c9a96e', marginBottom: 10 }}>Ποιες είναι οι ώρες λειτουργίας της ταβέρνας;</h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: 0 }}>Η ταβέρνα Anemoia είναι ανοιχτή καθημερινά από 8:30 π.μ. έως 10:30 π.μ.</p>
              </div>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 20 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#c9a96e', marginBottom: 10 }}>Προσφέρετε υπηρεσία delivery;</h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: 0 }}>Ναι, προσφέρουμε υπηρεσία delivery για την ευκολία σας.</p>
              </div>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 20 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#c9a96e', marginBottom: 10 }}>Ποιες είναι οι επιλογές στο μενού;</h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: 0 }}>Το μενού μας περιλαμβάνει μια ποικιλία από ελληνικά πιάτα, θαλασσινά και γλυκά.</p>
              </div>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 20 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#c9a96e', marginBottom: 10 }}>Είναι δυνατόν να κάνω κράτηση;</h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: 0 }}>Φυσικά, μπορείτε να κάνετε κράτηση μέσω του τηλεφώνου μας ή της ιστοσελίδας μας.</p>
              </div>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 20 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#c9a96e', marginBottom: 10 }}>Έχετε εξωτερικές θέσεις;</h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: 0 }}>Ναι, προσφέρουμε εξωτερικές θέσεις με θέα στη θάλασσα.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        
        <div style={{ padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px)', background: '#f5f0e8' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10 }}>ΤΙ ΛΕΝΕ ΟΙ ΠΕΛΑΤΕΣ</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,3vw,38px)', color: '#1a2332', marginBottom: 36, fontWeight: 400 }}>
              Κριτικές
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 20 }}>
              
              <div style={{ background: '#1a2332', borderRadius: 10, padding: '28px 32px' }}>
                <div style={{ color: '#c9a96e', fontSize: 16, letterSpacing: 3, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 18 }}>"Είναι μια ωραία ταβέρνα, με όμορφη ατμόσφαιρα και φοβερό φαγητό! Ότι δοκιμάσαμε ήταν πολύ νόστιμο και περιποιημένο! Ήταν πολύ προσεγμένο για ταβέρνα! Λίγο τσιμπημένες οι τιμές όμως το φαγητό νόστιμο με ικανοποιητικές μερίδες! Είναι δίπλα στη θάλασσα και έχει και ξαπλώστρες μπροστά! Είχε ωραία σπιτική λεμονάδα και ωραιότατο μπακλαβά με παγωτό!"</p>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', color: '#c9a96e', textTransform: 'uppercase' }}>— Maria D! ;p</div>
              </div>
              <div style={{ background: '#1a2332', borderRadius: 10, padding: '28px 32px' }}>
                <div style={{ color: '#c9a96e', fontSize: 16, letterSpacing: 3, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 18 }}>"Κάτι διαφορετικό στις Ροβιές.Αν θέλετε να ξεφύγετε από τις κλασικές ταβέρνες, υπέροχο φαγητό πάνω στην θάλασσα."</p>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', color: '#c9a96e', textTransform: 'uppercase' }}>— ΑΣΗΜΙΝΑ ΚΙΤΣΟΥ</div>
              </div>
              <div style={{ background: '#1a2332', borderRadius: 10, padding: '28px 32px' }}>
                <div style={{ color: '#c9a96e', fontSize: 16, letterSpacing: 3, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 18 }}>"Πολύ ωραίο εστιατόριο,με πολύ καλή εξυπηρέτηση, ποιοτικό φαγητό, γλυκό κ ατμόσφαιρα τοπ επιπέδου είτε είναι πρωί, είτε μεσημέρι είτε βράδυ.. Ότι δοκιμάσαμε,από φαγητό μέχρι γλυκό, γρανίτες κτλ ήταν υπέροχο.. Λίγο πιο ακριβό από τις συνηθισμένες ταβέρνες της περιοχής αλλά η θέα που σου προσφέρει κ η ποιότητα των γευμάτων δεν είναι οι συνηθισμένες της περιοχής, οπότε χαλάλι. Σωστός ο όρος που διάβασα κάπου,beach bar restaurant,είναι ο ορισμός.. Μπράβο σε όλο το team!"</p>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', color: '#c9a96e', textTransform: 'uppercase' }}>— Anastasios Stavropoulos</div>
              </div>
            </div>
          </div>
        </div>

        {/* E-E-A-T */}
        
        <div style={{ padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px)', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 10 }}>ΓΙΑ ΕΜΑΣ</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(17px,2vw,20px)', color: '#2c2c2c', lineHeight: 1.85, fontWeight: 300, marginBottom: 24 }}>Η Anemoia Greek Restaurant έχει ιστορία στην προσφορά ποιοτικού φαγητού στην περιοχή των Ροβιών. Με εμπειρία χρόνων, έχουμε δημιουργήσει ένα περιβάλλον φιλόξενο και ζεστό, που όλοι οι επισκέπτες μας απολαμβάνουν.</p>
            
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 500, color: '#1a2332', background: '#f5f0e8', border: '1px solid #c9a96e', borderRadius: 2, padding: '6px 14px', letterSpacing: '0.05em' }}>✓ 4.8 stars από 325 κριτικές στο Google</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 500, color: '#1a2332', background: '#f5f0e8', border: '1px solid #c9a96e', borderRadius: 2, padding: '6px 14px', letterSpacing: '0.05em' }}>✓ Πελάτες εκθειάζουν την ποιότητα των πιάτων μας</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 500, color: '#1a2332', background: '#f5f0e8', border: '1px solid #c9a96e', borderRadius: 2, padding: '6px 14px', letterSpacing: '0.05em' }}>✓ Διαθέτουμε εξαιρετική εξυπηρέτηση και φιλόξενο περιβάλλον</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: 'clamp(48px,8vw,80px) clamp(20px,5vw,80px)', background: '#1a2332', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 16 }}>ΚΡΑΤΗΣΗ</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', color: '#fff', marginBottom: 24, fontWeight: 400 }}>Κάντε Κράτηση Τώρα</h2>
          <a href="tel:698 706 1301" style={{ display: 'inline-block', fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 300, color: '#c9a96e', textDecoration: 'none', letterSpacing: '0.1em', marginBottom: 16 }}>
            698 706 1301
          </a>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', margin: 0 }}>Δευτέρα: 8:30 - 10:30 π.μ., Τρίτη: 8:30 - 10:30 π.μ., Τετάρτη: 8:30 - 10:30 π.μ., Πέμπτη: 8:30 - 10:30 π.μ., Παρασκευή: 8:30 - 10:30 π.μ., Σάββατο: 8:30 - 10:30 π.μ., Κυριακή: 8:30 - 10:30 π.μ.</p>
        </div>

        {/* Internal Links */}
        
        <div style={{ padding: 'clamp(24px,4vw,40px) clamp(20px,5vw,80px)', background: '#f5f0e8', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 16 }}>ΔΕΙΤΕ ΕΠΙΣΗΣ</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            
            <a href="//menu" style={{ fontFamily: "'Montserrat', sans-serif", padding: '10px 20px', background: '#1a2332', color: '#c9a96e', borderRadius: 2, fontSize: 13, textDecoration: 'none', fontWeight: 500, letterSpacing: '0.05em', border: '1px solid #c9a96e' }}>
              Δείτε το Μενού μας
            </a>
            <a href="//contact" style={{ fontFamily: "'Montserrat', sans-serif", padding: '10px 20px', background: '#1a2332', color: '#c9a96e', borderRadius: 2, fontSize: 13, textDecoration: 'none', fontWeight: 500, letterSpacing: '0.05em', border: '1px solid #c9a96e' }}>
              Επικοινωνήστε μαζί μας
            </a>
          </div>
        </div>

      </main>
    </>
  )
}