class Instruction < ApplicationRecord
  def self.parse(instructions)
    @instructions = []
    instructions.split("-$").each do |instruction|
      @instructions << instruction
    end
    @instructions
  end
end
