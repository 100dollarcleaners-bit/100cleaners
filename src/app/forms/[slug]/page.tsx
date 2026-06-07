import { notFound } from "next/navigation";
import { PrintableFormLayout } from "@/components/forms/PrintableFormLayout";
import { formContentMap } from "@/components/forms/form-contents";
import { getFormBySlug } from "@/lib/forms";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(formContentMap).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props) {
  const form = getFormBySlug(params.slug);
  return {
    title: form ? `${form.title} | 100 Cleaners` : "Form | 100 Cleaners",
  };
}

export default function FormPage({ params }: Props) {
  const entry = formContentMap[params.slug];
  const form = getFormBySlug(params.slug);

  if (!entry || !form) notFound();

  const { Content } = entry;

  return (
    <PrintableFormLayout title={entry.title}>
      <Content />
    </PrintableFormLayout>
  );
}
