
export const findMany = async ({lunchId}: {lunchId: string}) => {
  try {
    const excel = await prisma.lunch.findUnique({
      where: {
        id: String(lunchId),
      },
      include: {
        weeks: {
          include: {
            days: {
              include: {
                employee: true
              }
            },
            overrides: true
          }
        }
      }
    })

    return { success: true, data: excel }
  } catch (error) {
    return { success: false, error: 'Failed finding lunch' }
  }
}