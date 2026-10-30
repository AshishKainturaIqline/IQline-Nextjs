import { Badge } from "@/components/ui/badge"

export function JobStatusBadge({ status }) {
  return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>
}
