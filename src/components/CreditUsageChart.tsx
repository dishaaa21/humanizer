import { useEffect, useRef } from 'react';

interface CreditUsageChartProps {
  totalCredits: number;
  usedCredits: number;
}

const CreditUsageChart = ({ totalCredits, usedCredits }: CreditUsageChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Calculate percentage
    const percentage = Math.min(usedCredits / totalCredits, 1);
    const remaining = 1 - percentage;
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#f3f4f6'; // gray-100
    ctx.fill();
    
    // Draw usage arc
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      radius,
      -0.5 * Math.PI,
      (2 * percentage - 0.5) * Math.PI
    );
    ctx.closePath();
    
    // Set color based on usage
    let color = '#10b981'; // green-500
    if (percentage > 0.7 && percentage < 0.9) {
      color = '#f59e0b'; // amber-500
    } else if (percentage >= 0.9) {
      color = '#ef4444'; // red-500
    }
    
    ctx.fillStyle = color;
    ctx.fill();
    
    // Draw inner circle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Add text in center
    ctx.fillStyle = '#1f2937'; // gray-800
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round(percentage * 100)}%`, centerX, centerY - 10);
    
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#6b7280'; // gray-500
    ctx.fillText('used', centerX, centerY + 10);
    
  }, [totalCredits, usedCredits]);
  
  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={150} height={150} />
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{totalCredits - usedCredits}</span> of{' '}
          <span className="font-medium text-gray-900">{totalCredits}</span> credits remaining
        </p>
      </div>
    </div>
  );
};

export default CreditUsageChart;