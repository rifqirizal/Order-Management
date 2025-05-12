export function formatCurrency(amount: number): string {
  return `Rp ${amount.toLocaleString()}`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "/")
}
