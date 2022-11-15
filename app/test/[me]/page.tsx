export default function Page({ params }: { params: { me: string } }) {
  return <>Hi {params?.me}</>;
}
