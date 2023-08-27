export default function RecipeDetail({ detailLabel, detailValue }) {
  
  return (
    <div className="recipe-detail">
      <p className="detail-label">{detailLabel}</p>
      <p className="detail-value">{detailValue}</p>
    </div>
  );
}
