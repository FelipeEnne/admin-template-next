import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Table, { type Column } from "@/components/ui/Table";

interface Row {
  name: string;
  email: string;
}

const columns: Column<Row>[] = [
  { key: "name", header: "Nome" },
  { key: "email", header: "Email" },
];

describe("Table", () => {
  it("renderiza cabeçalhos e linhas", () => {
    render(
      <Table
        columns={columns}
        data={[{ name: "Ana", email: "ana@example.com" }]}
      />,
    );

    expect(
      screen.getByRole("columnheader", { name: "Nome" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "ana@example.com" }),
    ).toBeInTheDocument();
  });

  it("mostra o estado vazio ocupando todas as colunas", () => {
    render(<Table columns={columns} data={[]} emptyMessage="Sem registros" />);

    const cell = screen.getByRole("cell", { name: "Sem registros" });
    expect(cell).toHaveAttribute("colspan", "2");
  });

  it("usa o render customizado da coluna", () => {
    const custom: Column<Row>[] = [
      { key: "name", header: "Nome", render: (row) => <b>{row.name}!</b> },
    ];

    render(<Table columns={custom} data={[{ name: "Ana", email: "" }]} />);

    expect(screen.getByRole("cell", { name: "Ana!" })).toBeInTheDocument();
  });
});
