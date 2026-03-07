const actions = [
    { id: 'ride', label: 'Ride', icon: '🚗', color: 'bg-blue-500/10' },
    { id: 'market', label: 'Market', icon: '🛒', color: 'bg-orange-500/10' },
    { id: 'banking', label: 'Banking', icon: '💳', color: 'bg-[#D4AF37]/10' },
    { id: 'bills', label: 'Bills', icon: '💡', color: 'bg-green-500/10' }
];

const QuickActions = () => (
    <div className="grid grid-cols-4 gap-4">
        {actions.map(action => (
            <button key={action.id} className="flex flex-col items-center gap-2 group active:scale-90 transition-transform">
                <div className={`w-16 h-16 ${action.color} border border-white/5 rounded-[22px] flex items-center justify-center text-2xl group-hover:border-[#D4AF37]/40 transition-all`}>
                    {action.icon}
                </div>
                <span className="text-[10px] font-black uppercase text-gray-500 group-hover:text-white">{action.label}</span>
            </button>
        ))}
    </div>
);

export default QuickActions;
