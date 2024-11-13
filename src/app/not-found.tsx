export default function NotFound() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>
                <div style={{ fontWeight: "700", fontSize: "130px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    404
                </div>
                <hr style={{
                    color: "#bcbcbc", height: "1px", marginTop: "0", border: "none", backgroundColor: "var(--gray)",
                }} />
                <div style={{ fontSize: "22px" }}>
                    Where did you get this link?
                </div>
            </div>
        </div >
    );
}
