export default function History({ history, darkMode }) {

  return (

    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: darkMode ? "#1e1e1e" : "#fff0f5",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "hotpink",
        }}
      >
        📜 Diet History
      </h1>

      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
        }}
      >

        {history.length === 0 ? (

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            No History Yet 😔
          </div>

        ) : (

          history.map((item, index) => (

            <div
              key={index}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "20px",
                whiteSpace: "pre-line",
              }}
            >
              {item}
            </div>

          ))

        )}

      </div>

    </div>
  );
}