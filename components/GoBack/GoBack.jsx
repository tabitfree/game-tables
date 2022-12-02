export default function BreadCrumbs({ crumbs }) {
  return (
    <section>
      {crumbs.map((crumb, key) => (
        <div key={key}>
          <a href={crumb.link}>{'<--- ' + crumb.txt}</a>
        </div>
      ))}
    </section>
  )
}
