export default function PricingPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Pricing</h1>
      <p className="text-gray-600 mb-8">
        AI Vory is currently in early development. Pricing details coming soon.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
          <div className="text-3xl font-bold text-gray-900 mb-4">Free</div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>All 10 patterns</li>
            <li>Bootstrap + Ant Design</li>
            <li>MIT License</li>
            <li>Community support</li>
          </ul>
        </div>

        <div className="border-2 border-blue-500 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro</h3>
          <div className="text-3xl font-bold text-gray-900 mb-4">
            <span className="text-gray-400 line-through text-lg">$49</span> TBD
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Everything in Community</li>
            <li>Premium patterns</li>
            <li>Figma design kit</li>
            <li>Priority support</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
          <div className="text-3xl font-bold text-gray-900 mb-4">Contact us</div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Everything in Pro</li>
            <li>Custom patterns</li>
            <li>White-label option</li>
            <li>Dedicated support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
