export default function Error({ message }) {
  return (
    <div className="error">
      {message || 'Something went wrong'}
    </div>
  )
}