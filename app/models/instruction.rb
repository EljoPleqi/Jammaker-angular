class Instruction < ApplicationRecord
  def self.parse(instructions)
    @instructions = []
    instructions.split("Step").each do |instruction|
      @instructions << instruction
    end
    @instructions
  end
end
