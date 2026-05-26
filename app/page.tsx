export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#070a0d",
      color: "#f5f5f7",
      fontFamily: "Arial, sans-serif",
      padding: "40px 20px"
    }}>
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto",
        textAlign: "center",
        paddingTop: "90px"
      }}>
        <h1 style={{ fontSize: "56px", marginBottom: "18px" }}>
          VALCRONS
        </h1>

        <p style={{
          fontSize: "22px",
          color: "#a8afb8",
          maxWidth: "720px",
          margin: "0 auto 34px",
          lineHeight: "1.6"
        }}>
          Industrial service connection platform for factories, technicians, and urgent maintenance requests.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/dashboard/client" style={buttonGold}>Post a Request</a>
          <a href="/dashboard/technician" style={buttonDark}>Technician Dashboard</a>
        </div>
      </section>
    </main>
  );
}

const buttonGold = {
  background: "#c8a96b",
  color: "#070a0d",
  padding: "14px 26px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "700"
};

const buttonDark = {
  background: "transparent",
  color: "#f5f5f7",
  padding: "14px 26px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "700",
  border: "1px solid rgba(255,255,255,.2)"
};
