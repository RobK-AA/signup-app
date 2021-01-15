async function users(parent, args, context, info) {
  return context.prisma.user.findMany();
}

module.exports = {
  users
};