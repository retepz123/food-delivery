export async function isOwner(req, res, next) {
  if (req.user.role !== 'owner' && req.user.role !== 'admin'){
    return res.status(400).json({ message: 'Only Restaurant Owners'});
  }
  next();
}