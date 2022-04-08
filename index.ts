import type { RefractorElement, Text } from "refractor";

type RefractorNode = RefractorElement | Text;

function isElement(node: RefractorNode): node is RefractorElement {
  return node.type === "element";
};

function flatten(
  nodes: RefractorNode[],
  className?: ReadonlySet<string>
): FlatNodes {
  return nodes.reduce<FlatNodes>(
    (acc, node) =>
      acc.concat(
        isElement(node)
          ? flatten(
              node.children,
              new Set([
                ...(className || []),
                // @ts-ignore
                ...(node.properties.className || []),
              ])
            )
          : className
          ? {
              type: "element",
              tagName: "span",
              properties: { className: [...className] },
              children: [node],
            }
          : node
      ),
    []
  );
}

export default flatten;

export type FlatNodes = FlatNode[];
export type FlatNode = FlatElement | FlatText;
export type FlatElement = {
  type: "element";
  tagName: "span";
  properties: { className: string[] };
  children: [FlatText];
};
export type FlatText = {
  type: "text";
  value: string;
};
